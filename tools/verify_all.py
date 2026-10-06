import sys
import io
import json
import subprocess
from contextlib import redirect_stdout, redirect_stderr

try:
    res = subprocess.run(["node", "tools/dump.js"], capture_output=True, text=True, encoding="utf-8", check=True)
    data = json.loads(res.stdout)
except Exception as e:
    print(f"Error loading questions: {e}")
    sys.exit(1)

def norm(s):
    return "\n".join(line.rstrip() for line in str(s).replace("\r\n", "\n").split("\n")).strip()

all_errors = 0

for subj, bank in data.items():
    print(f"\n==========================================")
    print(f"กำลังตรวจสอบวิชา: {subj.upper()} (จำนวน {len(bank)} ข้อ)")
    print(f"==========================================")
    errors = 0
    ran = 0
    ids = set()
    cats = {}

    for q in bank:
        qid = q.get("id")
        if not qid or qid in ids:
            print(f"✗ {qid}: id ว่างหรือซ้ำ")
            errors += 1
        ids.add(qid)

        cat = q.get("cat")
        cats[cat] = cats.get(cat, 0) + 1

        choices = q.get("choices", [])
        if len(choices) != 4:
            print(f"✗ {qid}: ต้องมี 4 ตัวเลือก (พบ {len(choices)})")
            errors += 1
            continue

        norm_choices = [norm(c) for c in choices]
        if len(set(norm_choices)) != 4:
            print(f"✗ {qid}: มีตัวเลือกซ้ำกัน")
            errors += 1

        ans = q.get("answer")
        if not isinstance(ans, int) or ans < 0 or ans > 3:
            print(f"✗ {qid}: answer ต้องเป็น 0-3 (พบ {ans})")
            errors += 1
            continue

        if not q.get("run"):
            continue

        code = q.get("code")
        if not code:
            print(f"✗ {qid}: run: true แต่ไม่มี code")
            errors += 1
            continue

        ran += 1
        expected_error = q.get("errorType")

        stdout_buf = io.StringIO()
        stderr_buf = io.StringIO()
        g = {}
        raised_exc = None

        try:
            with redirect_stdout(stdout_buf), redirect_stderr(stderr_buf):
                exec(code, g)
        except Exception as exc:
            raised_exc = exc

        actual_out = norm(stdout_buf.getvalue())
        expected_choice = norm(choices[ans])

        if expected_error:
            if raised_exc is None:
                print(f"✗ {qid}: คาดว่าจะเกิด {expected_error} แต่โค้ดรันผ่าน ผลลัพธ์: {actual_out}")
                errors += 1
            elif expected_error not in type(raised_exc).__name__:
                print(f"✗ {qid}: คาดว่าจะเกิด {expected_error} แต่เกิด {type(raised_exc).__name__}: {raised_exc}")
                errors += 1
        else:
            if raised_exc is not None:
                print(f"✗ {qid}: โค้ดเกิด error {type(raised_exc).__name__}: {raised_exc}")
                errors += 1
            elif actual_out != expected_choice:
                print(f"✗ {qid}: เฉลย choice[{ans}]='{expected_choice}' แต่รันได้ '{actual_out}'")
                errors += 1

    print(f"ผลลัพธ์ {subj}: ทั้งหมด {len(bank)} ข้อ | รันโค้ด {ran} ข้อ | ผิดพลาด {errors}")
    for c, cnt in sorted(cats.items()):
        print(f" - {c}: {cnt} ข้อ")
    all_errors += errors

print(f"\n==========================================")
print(f"รวมทั้งระบบ: ผิดพลาด {all_errors}")
print(f"==========================================")
sys.exit(all_errors)
