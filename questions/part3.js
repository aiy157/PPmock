window.QUESTION_BANK = window.QUESTION_BANK || [];
window.QUESTION_BANK.push(
{
  id: "P3-001",
  cat: "โครงสร้างข้อมูล",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `a = [1, 2, 3]
b = a
b.append(4)
print(a)`,
  choices: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4]", "เกิด Error"],
  answer: 1,
  run: true,
  explain: "b = a ไม่ได้สร้าง list ใหม่ แต่ทั้ง a และ b อ้างอิง list เดียวกัน เมื่อ append ผ่าน b ค่าที่เห็นผ่าน a จึงเปลี่ยนด้วยเป็น [1, 2, 3, 4]"
},
{
  id: "P3-002",
  cat: "โครงสร้างข้อมูล",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `s = [10, 20, 30, 40, 50, 60]
print(s[1:5:2], s[-2:])`,
  choices: ["[20, 30, 40] [50, 60]", "[20, 40] [60]", "[20, 40] [50, 60]", "[30, 50] [50, 60]"],
  answer: 2,
  run: true,
  explain: "s[1:5:2] เริ่มที่ index 1 ไม่รวม index 5 ก้าวทีละ 2 จึงได้ index 1, 3 คือ [20, 40] ส่วน s[-2:] คือสองตัวสุดท้าย [50, 60]"
},
{
  id: "P3-003",
  cat: "โครงสร้างข้อมูล",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `a = [1, 2]
b = [1, 2]
a.append([3, 4])
b.extend([3, 4])
print(len(a), len(b))`,
  choices: ["4 4", "4 3", "3 3", "3 4"],
  answer: 3,
  run: true,
  explain: "append เพิ่ม [3, 4] เข้าไปเป็นสมาชิกตัวเดียว (list ซ้อน) a จึงมี 3 ตัว ส่วน extend นำสมาชิกแต่ละตัวมาต่อท้าย b จึงมี 4 ตัว"
},
{
  id: "P3-004",
  cat: "โครงสร้างข้อมูล",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `a = [5, 6, 7]
a.insert(1, 9)
a.insert(-1, 8)
print(a)`,
  choices: ["[5, 9, 6, 7, 8]", "[5, 9, 6, 8, 7]", "[9, 5, 6, 8, 7]", "[5, 9, 8, 6, 7]"],
  answer: 1,
  run: true,
  explain: "insert(1, 9) แทรก 9 ที่ตำแหน่ง 1 ได้ [5, 9, 6, 7] ส่วน insert(-1, 8) แทรกก่อนสมาชิกตัวสุดท้าย (ไม่ใช่ต่อท้าย) จึงได้ [5, 9, 6, 8, 7]"
},
{
  id: "P3-005",
  cat: "โครงสร้างข้อมูล",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `a = [3, 1, 4, 1, 5, 9]
a.remove(1)
x = a.pop()
y = a.pop(0)
print(a, x, y)`,
  choices: ["[4, 1, 5] 9 3", "[1, 4, 5] 9 3", "[4, 5] 9 3", "[3, 4, 1] 5 9"],
  answer: 0,
  run: true,
  explain: "remove(1) ลบเลข 1 ตัวแรกที่พบ ได้ [3, 4, 1, 5, 9] จากนั้น pop() ดึงตัวสุดท้าย x = 9 และ pop(0) ดึงตัวแรก y = 3 เหลือ [4, 1, 5]"
},
{
  id: "P3-006",
  cat: "โครงสร้างข้อมูล",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `a = [3, 1, 2]
b = a.sort()
print(a, b)`,
  choices: ["[3, 1, 2] [1, 2, 3]", "[1, 2, 3] [1, 2, 3]", "[1, 2, 3] None", "None [1, 2, 3]"],
  answer: 2,
  run: true,
  explain: "เมธอด sort() เรียงลำดับ list เดิมในที่ (in-place) และคืนค่า None ดังนั้น a กลายเป็น [1, 2, 3] ส่วน b เป็น None (ถ้าต้องการ list ใหม่ต้องใช้ sorted(a))"
},
{
  id: "P3-007",
  cat: "โครงสร้างข้อมูล",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `words = ["kiwi", "fig", "banana", "apple"]
print(sorted(words, key=len, reverse=True))`,
  choices: ["['fig', 'kiwi', 'apple', 'banana']", "['kiwi', 'fig', 'banana', 'apple']", "['banana', 'kiwi', 'fig', 'apple']", "['banana', 'apple', 'kiwi', 'fig']"],
  answer: 3,
  run: true,
  explain: "key=len ทำให้เรียงตามความยาวคำ (kiwi=4, fig=3, banana=6, apple=5) และ reverse=True เรียงจากมากไปน้อย จึงได้ banana, apple, kiwi, fig"
},
{
  id: "P3-008",
  cat: "โครงสร้างข้อมูล",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `m = [[0] * 3] * 2
m[0][1] = 5
print(m)`,
  choices: ["[[0, 5, 0], [0, 0, 0]]", "[[0, 5, 0], [0, 5, 0]]", "[[5, 0, 0], [0, 0, 0]]", "เกิด IndexError"],
  answer: 1,
  run: true,
  explain: "[[0] * 3] * 2 ไม่ได้สร้างแถวใหม่ 2 แถว แต่เป็นการอ้างอิง list แถวเดียวกันซ้ำ 2 ครั้ง เมื่อแก้ m[0][1] แถวที่สองจึงเปลี่ยนตามด้วย"
},
{
  id: "P3-009",
  cat: "โครงสร้างข้อมูล",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
s = 0
for row in m:
    s += row[1]
print(s, m[2][0])`,
  choices: ["12 3", "15 3", "15 7", "6 7"],
  answer: 2,
  run: true,
  explain: "row[1] คือสมาชิกคอลัมน์ที่ 2 ของแต่ละแถว ได้ 2 + 5 + 8 = 15 และ m[2][0] คือแถว index 2 คอลัมน์ index 0 ได้ 7"
},
{
  id: "P3-010",
  cat: "โครงสร้างข้อมูล",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `print([x * x for x in range(10) if x % 3 == 0])`,
  choices: ["[9, 36, 81]", "[0, 3, 6, 9]", "[0, 9, 36, 81, 144]", "[0, 9, 36, 81]"],
  answer: 3,
  run: true,
  explain: "range(10) ให้ 0-9 ตัวที่หาร 3 ลงตัวคือ 0, 3, 6, 9 (อย่าลืม 0) แล้วยกกำลังสองได้ [0, 9, 36, 81]"
},
{
  id: "P3-011",
  cat: "โครงสร้างข้อมูล",
  q: "กำหนดให้ a = [1, 2, 3] คำสั่งใดต่อไปนี้ไม่ได้สร้าง list ใหม่ (ถ้าแก้ไขสมาชิกผ่าน b แล้ว a จะเปลี่ยนตาม)",
  choices: ["b = a[:]", "b = list(a)", "b = a.copy()", "b = a"],
  answer: 3,
  explain: "a[:], list(a) และ a.copy() ต่างสร้าง list ใหม่ (shallow copy) ส่วน b = a เป็นเพียงการให้ชื่อ b อ้างอิงออบเจกต์เดียวกับ a"
},
{
  id: "P3-012",
  cat: "โครงสร้างข้อมูล",
  q: "เมื่อรันโปรแกรมต่อไปนี้ จะได้ผลลัพธ์อย่างไร",
  code: `t = (1, 2, 3)
t[0] = 10
print(t)`,
  choices: ["เกิด TypeError", "(10, 2, 3)", "(1, 2, 3)", "เกิด IndexError"],
  answer: 0,
  run: true,
  errorType: "TypeError",
  explain: "tuple เป็นข้อมูลที่เปลี่ยนแปลงไม่ได้ (immutable) การกำหนดค่าให้สมาชิก t[0] จึงเกิด TypeError: 'tuple' object does not support item assignment"
},
{
  id: "P3-013",
  cat: "โครงสร้างข้อมูล",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `a, b, c = 1, 2, 3
a, b = b, a + c
c = a * b
print(a, b, c)`,
  choices: ["2 4 8", "2 5 10", "2 4 6", "4 2 8"],
  answer: 0,
  run: true,
  explain: "ด้านขวาของ a, b = b, a + c ถูกคำนวณก่อนด้วยค่าเดิม ได้ (2, 1 + 3) = (2, 4) จึงได้ a = 2, b = 4 จากนั้น c = 2 * 4 = 8"
},
{
  id: "P3-014",
  cat: "โครงสร้างข้อมูล",
  q: "ข้อใดเป็นการสร้าง tuple ที่มีสมาชิกเพียง 1 ตัวได้ถูกต้อง",
  choices: ["t = (5)", "t = (5,)", "t = [5]", "t = {5}"],
  answer: 1,
  explain: "(5) เป็นเพียงเลข 5 ในวงเล็บ (ชนิด int) ต้องมีเครื่องหมายจุลภาคเป็น (5,) จึงเป็น tuple ส่วน [5] คือ list และ {5} คือ set"
},
{
  id: "P3-015",
  cat: "โครงสร้างข้อมูล",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `s = "banana"
d = {}
for ch in s:
    d[ch] = d.get(ch, 0) + 1
print(d)`,
  choices: ["{'b': 1, 'a': 1, 'n': 1}", "{'b': 0, 'a': 2, 'n': 1}", "{'b': 1, 'a': 3, 'n': 2}", "เกิด KeyError"],
  answer: 2,
  run: true,
  explain: "d.get(ch, 0) คืนค่า 0 เมื่อยังไม่มี key จึงไม่เกิด KeyError แล้วบวก 1 ทุกครั้งที่พบตัวอักษร ได้ b=1, a=3, n=2 โดย dict เรียงตามลำดับที่เพิ่ม key"
},
{
  id: "P3-016",
  cat: "โครงสร้างข้อมูล",
  q: "เมื่อรันโปรแกรมต่อไปนี้ จะได้ผลลัพธ์อย่างไร",
  code: `d = {"a": 1, "b": 2}
print(d.get("c", 0) + d["b"])
print(d["c"])`,
  choices: ["พิมพ์ 2 แล้วพิมพ์ 0", "พิมพ์ 2 แล้วเกิด KeyError", "เกิด KeyError ทันทีโดยไม่พิมพ์อะไร", "พิมพ์ None แล้วเกิด KeyError"],
  answer: 1,
  run: true,
  errorType: "KeyError",
  explain: "บรรทัดแรก d.get(\"c\", 0) คืน 0 จึงพิมพ์ 0 + 2 = 2 ได้ตามปกติ แต่บรรทัดที่สอง d[\"c\"] เข้าถึง key ที่ไม่มีด้วยวงเล็บเหลี่ยมจึงเกิด KeyError"
},
{
  id: "P3-017",
  cat: "โครงสร้างข้อมูล",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `d = {"x": 1, "y": 2}
d.update({"y": 20, "z": 3})
total = 0
for k, v in d.items():
    total += v
print(len(d), total)`,
  choices: ["3 24", "4 26", "3 6", "2 21"],
  answer: 0,
  run: true,
  explain: "update เขียนทับค่า key ที่มีอยู่แล้ว (y เป็น 20) และเพิ่ม key ใหม่ z ได้ {'x': 1, 'y': 20, 'z': 3} จึงมี 3 key และผลรวมค่า 1 + 20 + 3 = 24"
},
{
  id: "P3-018",
  cat: "โครงสร้างข้อมูล",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `a = {1, 2, 3, 4}
b = {3, 4, 5}
print(len(a | b), len(a & b), sorted(a - b))`,
  choices: ["7 2 [1, 2]", "5 2 [5]", "5 3 [1, 2, 5]", "5 2 [1, 2]"],
  answer: 3,
  run: true,
  explain: "a | b (union) = {1, 2, 3, 4, 5} มี 5 ตัว, a & b (intersection) = {3, 4} มี 2 ตัว และ a - b (difference) คือสมาชิกที่อยู่ใน a แต่ไม่อยู่ใน b = {1, 2}"
},
{
  id: "P3-019",
  cat: "โครงสร้างข้อมูล",
  q: "ข้อมูลในข้อใดต่อไปนี้ไม่สามารถใช้เป็น key ของ dictionary ได้",
  choices: ["(1, 2)", "\"abc\"", "[1, 2]", "3.14"],
  answer: 2,
  explain: "key ของ dict ต้องเป็นข้อมูลที่ hash ได้ ซึ่งโดยทั่วไปคือข้อมูลที่เปลี่ยนแปลงไม่ได้ เช่น tuple, str, int, float แต่ list เปลี่ยนแปลงได้ (mutable) จึงใช้เป็น key ไม่ได้ (เกิด TypeError: unhashable type)"
},
{
  id: "P3-020",
  cat: "โครงสร้างข้อมูล",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `names = ["A", "B", "C"]
scores = [90, 75]
for n, s in zip(names, scores):
    print(n, s)`,
  choices: ["A 90\nB 75\nC None", "A 90\nB 75", "เกิด IndexError", "A 90\nB 75\nC 0"],
  answer: 1,
  run: true,
  explain: "zip จับคู่สมาชิกทีละตำแหน่งและหยุดเมื่อ list ที่สั้นที่สุดหมด จึงได้เพียง 2 คู่ (A, 90) และ (B, 75) โดยไม่เกิด error"
},
{
  id: "P3-021",
  cat: "โครงสร้างข้อมูล",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `for i, ch in enumerate("abc", start=1):
    print(i * ch, end=" ")`,
  choices: ["1a 2b 3c", "a b c", "เกิด TypeError", "a bb ccc"],
  answer: 3,
  run: true,
  explain: "enumerate(..., start=1) ให้คู่ (1, 'a'), (2, 'b'), (3, 'c') และ int * str คือการทำซ้ำสตริง จึงได้ 'a', 'bb', 'ccc'"
},
{
  id: "P3-022",
  cat: "โครงสร้างข้อมูล",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `a = [1, [2, 3]]
b = a.copy()
b[0] = 100
b[1].append(4)
print(a)`,
  choices: ["[1, [2, 3]]", "[100, [2, 3, 4]]", "[1, [2, 3, 4]]", "[100, [2, 3]]"],
  answer: 2,
  run: true,
  explain: "copy() เป็น shallow copy: b เป็น list ใหม่ การแก้ b[0] จึงไม่กระทบ a แต่ list ซ้อน [2, 3] ยังเป็นออบเจกต์เดียวกัน การ append ผ่าน b[1] จึงเห็นใน a ด้วย"
},
{
  id: "P3-023",
  cat: "การเรียงลำดับและการค้นหา",
  q: "โปรแกรมต่อไปนี้ทำ Bubble Sort เพียง 1 รอบ (pass) ผลลัพธ์ที่พิมพ์คืออะไร",
  code: `a = [5, 1, 4, 2, 8]
n = len(a)
for j in range(n - 1):
    if a[j] > a[j + 1]:
        a[j], a[j + 1] = a[j + 1], a[j]
print(a)`,
  choices: ["[1, 2, 4, 5, 8]", "[1, 4, 2, 5, 8]", "[1, 5, 4, 2, 8]", "[1, 4, 5, 2, 8]"],
  answer: 1,
  run: true,
  explain: "เปรียบเทียบคู่ติดกันไล่ไปทางขวา: สลับ 5,1 → [1,5,4,2,8], สลับ 5,4 → [1,4,5,2,8], สลับ 5,2 → [1,4,2,5,8], 5 กับ 8 ไม่สลับ หลังรอบแรกค่ามากสุดจะไปอยู่ท้ายสุด"
},
{
  id: "P3-024",
  cat: "การเรียงลำดับและการค้นหา",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้ (นับจำนวนครั้งที่สลับใน Bubble Sort) คืออะไร",
  code: `a = [4, 3, 2, 1]
swaps = 0
for i in range(len(a) - 1):
    for j in range(len(a) - 1 - i):
        if a[j] > a[j + 1]:
            a[j], a[j + 1] = a[j + 1], a[j]
            swaps += 1
print(swaps)`,
  choices: ["3", "4", "6", "16"],
  answer: 2,
  run: true,
  explain: "ข้อมูลเรียงกลับด้านทั้งหมด ทุกการเปรียบเทียบต้องสลับ: รอบ 1 สลับ 3 ครั้ง รอบ 2 สลับ 2 ครั้ง รอบ 3 สลับ 1 ครั้ง รวม 3 + 2 + 1 = 6 = n(n-1)/2"
},
{
  id: "P3-025",
  cat: "การเรียงลำดับและการค้นหา",
  q: "โปรแกรมต่อไปนี้ทำ Selection Sort เพียง 2 รอบ ผลลัพธ์ที่พิมพ์คืออะไร",
  code: `a = [29, 10, 14, 37, 13]
for i in range(2):
    m = i
    for j in range(i + 1, len(a)):
        if a[j] < a[m]:
            m = j
    a[i], a[m] = a[m], a[i]
print(a)`,
  choices: ["[10, 13, 14, 37, 29]", "[10, 13, 14, 29, 37]", "[10, 14, 29, 37, 13]", "[10, 13, 29, 37, 14]"],
  answer: 0,
  run: true,
  explain: "รอบที่ 1 หาค่าน้อยสุดคือ 10 สลับกับตำแหน่ง 0 ได้ [10, 29, 14, 37, 13] รอบที่ 2 หาค่าน้อยสุดตั้งแต่ index 1 คือ 13 สลับกับ 29 ได้ [10, 13, 14, 37, 29]"
},
{
  id: "P3-026",
  cat: "การเรียงลำดับและการค้นหา",
  q: "โปรแกรมต่อไปนี้ทำ Insertion Sort สำหรับ i = 1 และ i = 2 เท่านั้น ผลลัพธ์ที่พิมพ์คืออะไร",
  code: `a = [7, 3, 5, 1, 9]
for i in range(1, 3):
    key = a[i]
    j = i - 1
    while j >= 0 and a[j] > key:
        a[j + 1] = a[j]
        j -= 1
    a[j + 1] = key
print(a)`,
  choices: ["[1, 3, 5, 7, 9]", "[3, 7, 5, 1, 9]", "[3, 5, 1, 7, 9]", "[3, 5, 7, 1, 9]"],
  answer: 3,
  run: true,
  explain: "i = 1: นำ 3 แทรกก่อน 7 ได้ [3, 7, 5, 1, 9] และ i = 2: นำ 5 แทรกระหว่าง 3 กับ 7 ได้ [3, 5, 7, 1, 9] ส่วน 1 และ 9 ยังไม่ถูกพิจารณา"
},
{
  id: "P3-027",
  cat: "การเรียงลำดับและการค้นหา",
  q: "โปรแกรม Binary Search ต่อไปนี้จะพิมพ์ค่า mid ออกมาตามลำดับอย่างไร",
  code: `a = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
target = 23
lo, hi = 0, len(a) - 1
while lo <= hi:
    mid = (lo + hi) // 2
    print(mid, end=" ")
    if a[mid] == target:
        break
    elif a[mid] < target:
        lo = mid + 1
    else:
        hi = mid - 1`,
  choices: ["4 6 5", "4 7 5", "5 7 6", "4 7 6 5"],
  answer: 1,
  run: true,
  explain: "lo=0, hi=9 → mid=4 (16 < 23) จึง lo=5; lo=5, hi=9 → mid=7 (56 > 23) จึง hi=6; lo=5, hi=6 → mid=5 พบ 23 หยุด จึงพิมพ์ 4 7 5"
},
{
  id: "P3-028",
  cat: "การเรียงลำดับและการค้นหา",
  q: "ถ้าค้นหาข้อมูลใน list ที่เรียงลำดับแล้วจำนวน 1,000 ตัวด้วย Binary Search จะต้องเปรียบเทียบอย่างมากที่สุดประมาณกี่ครั้ง",
  choices: ["ประมาณ 10 ครั้ง", "ประมาณ 100 ครั้ง", "ประมาณ 500 ครั้ง", "1,000 ครั้ง"],
  answer: 0,
  explain: "Binary Search ตัดช่วงค้นหาลงครึ่งหนึ่งทุกครั้ง จำนวนครั้งมากสุดประมาณ log2(n) เนื่องจาก 2^10 = 1024 ≥ 1000 จึงใช้ไม่เกินประมาณ 10 ครั้ง (ต่างจาก Linear Search ที่อาจต้องเปรียบเทียบถึง 1,000 ครั้ง)"
},
{
  id: "P3-029",
  cat: "การเรียงลำดับและการค้นหา",
  q: "เงื่อนไขที่จำเป็นของข้อมูลเพื่อให้ใช้ Binary Search ได้อย่างถูกต้องคือข้อใด",
  choices: ["ข้อมูลต้องมีจำนวนเป็นเลขคู่", "ข้อมูลต้องไม่มีค่าซ้ำกัน", "ข้อมูลต้องเรียงลำดับไว้ก่อนแล้ว", "ข้อมูลต้องเป็นจำนวนเต็มเท่านั้น"],
  answer: 2,
  explain: "Binary Search อาศัยการเปรียบเทียบกับค่าตรงกลางเพื่อตัดสินใจว่าจะค้นต่อครึ่งซ้ายหรือขวา ซึ่งใช้ได้เฉพาะเมื่อข้อมูลเรียงลำดับแล้วเท่านั้น จำนวนข้อมูล ค่าซ้ำ หรือชนิดข้อมูลไม่ใช่ข้อจำกัด"
},
{
  id: "P3-030",
  cat: "การเรียงลำดับและการค้นหา",
  q: "โปรแกรมต่อไปนี้ใช้ list เป็น Stack ผลลัพธ์คืออะไร",
  code: `s = []
for x in [1, 2, 3]:
    s.append(x)
s.pop()
s.append(4)
s.append(5)
print(s.pop(), s.pop(), s)`,
  choices: ["1 2 [4, 5]", "5 4 [1, 2, 4, 5]", "5 4 [1, 2]", "4 5 [1, 2]"],
  answer: 2,
  run: true,
  explain: "Stack เป็นแบบ LIFO: หลังใส่ 1, 2, 3 แล้ว pop() เอา 3 ออก จากนั้นใส่ 4, 5 ได้ [1, 2, 4, 5] การ pop สองครั้งได้ 5 แล้ว 4 (อาร์กิวเมนต์ประเมินจากซ้ายไปขวา) เหลือ s = [1, 2]"
},
{
  id: "P3-031",
  cat: "การเรียงลำดับและการค้นหา",
  q: "โปรแกรมต่อไปนี้ใช้ list เป็น Queue ผลลัพธ์คืออะไร",
  code: `q = []
q.append("A")
q.append("B")
q.append("C")
x = q.pop(0)
q.append("D")
y = q.pop(0)
print(x, y, q)`,
  choices: ["C D ['A', 'B']", "D C ['A', 'B']", "A B ['D', 'C']", "A B ['C', 'D']"],
  answer: 3,
  run: true,
  explain: "Queue เป็นแบบ FIFO: pop(0) นำตัวแรกออก x = 'A' เหลือ ['B', 'C'] เติม 'D' ต่อท้ายได้ ['B', 'C', 'D'] แล้ว pop(0) อีกครั้งได้ y = 'B' เหลือ ['C', 'D']"
},
{
  id: "P3-032",
  cat: "การเรียงลำดับและการค้นหา",
  q: "ฟังก์ชัน Undo ในโปรแกรมแก้ไขข้อความ ซึ่งต้องยกเลิกคำสั่งล่าสุดที่ทำก่อนเสมอ เหมาะที่จะใช้โครงสร้างข้อมูลแบบใดเก็บประวัติคำสั่ง",
  choices: ["Stack (LIFO)", "Queue (FIFO)", "Set", "Dictionary"],
  answer: 0,
  explain: "Undo ต้องนำคำสั่งที่ทำล่าสุดออกมาก่อน ซึ่งตรงกับหลัก Last-In-First-Out ของ Stack (ใน Python ใช้ list.append() และ list.pop())"
},
{
  id: "P3-033",
  cat: "การจัดการข้อผิดพลาดและไฟล์",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `try:
    x = 10 / 2
    print("A")
except ZeroDivisionError:
    print("B")
else:
    print("C")
finally:
    print("D")`,
  choices: ["A\nD", "A\nC\nD", "A\nB\nC\nD", "A\nC"],
  answer: 1,
  run: true,
  explain: "บล็อก try ทำงานสำเร็จไม่มี exception จึงไม่เข้า except แต่จะเข้า else (ทำเมื่อไม่มี exception) และ finally ทำงานเสมอ ได้ A, C, D"
},
{
  id: "P3-034",
  cat: "การจัดการข้อผิดพลาดและไฟล์",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `def f(x):
    try:
        return 10 // x
    except ZeroDivisionError:
        return -1
    finally:
        print("F", end=" ")

print(f(0), f(5))`,
  choices: ["-1 2", "F -1 F 2", "F F -1 2", "-1 F 2 F"],
  answer: 2,
  run: true,
  explain: "อาร์กิวเมนต์ของ print ถูกประเมินก่อน: f(0) เกิด ZeroDivisionError คืน -1 แต่ finally พิมพ์ F ก่อนออกจากฟังก์ชัน f(5) คืน 2 และพิมพ์ F อีกครั้ง จากนั้น print จึงพิมพ์ -1 2"
},
{
  id: "P3-035",
  cat: "การจัดการข้อผิดพลาดและไฟล์",
  q: "เมื่อรันโปรแกรมต่อไปนี้ จะได้ผลลัพธ์อย่างไร",
  code: `data = ["10", "20", "abc"]
total = 0
for s in data:
    total += int(s)
print(total)`,
  choices: ["30", "เกิด TypeError", "เกิด NameError", "เกิด ValueError"],
  answer: 3,
  run: true,
  errorType: "ValueError",
  explain: "int(\"10\") และ int(\"20\") แปลงได้ แต่ int(\"abc\") เป็นสตริงชนิดถูกต้องที่มีค่าแปลงเป็นจำนวนเต็มไม่ได้ จึงเกิด ValueError: invalid literal for int() และไม่ถึงบรรทัด print"
},
{
  id: "P3-036",
  cat: "การจัดการข้อผิดพลาดและไฟล์",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `a = [1, 2, 3]
try:
    print(a[3])
except KeyError:
    print("K")
except IndexError:
    print("I")
except Exception:
    print("E")`,
  choices: ["I", "K", "E", "I\nE"],
  answer: 0,
  run: true,
  explain: "a[3] เกินขอบเขต list (index สูงสุดคือ 2) จึงเกิด IndexError Python ตรวจ except จากบนลงล่างและเข้าเพียงบล็อกแรกที่ตรงเท่านั้น จึงพิมพ์ I เพียงอย่างเดียว"
},
{
  id: "P3-037",
  cat: "การจัดการข้อผิดพลาดและไฟล์",
  q: "นิพจน์ใดต่อไปนี้เมื่อประเมินค่าแล้วจะเกิด TypeError",
  choices: ['int("abc")', "[1, 2][5]", '"5" + 3', '{}["k"]'],
  answer: 2,
  explain: "\"5\" + 3 เป็นการบวก str กับ int ซึ่งเป็นชนิดที่ใช้ร่วมกันไม่ได้จึงเกิด TypeError ส่วน int(\"abc\") เกิด ValueError, [1, 2][5] เกิด IndexError และ {}[\"k\"] เกิด KeyError"
},
{
  id: "P3-038",
  cat: "การจัดการข้อผิดพลาดและไฟล์",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `def check(age):
    if age < 0:
        raise ValueError("อายุติดลบ")
    return age

try:
    print(check(20))
    print(check(-1))
    print("end")
except ValueError as e:
    print("Error:", e)`,
  choices: ["20\nError: อายุติดลบ", "20\nError: อายุติดลบ\nend", "Error: อายุติดลบ", "20\n-1\nend"],
  answer: 0,
  run: true,
  explain: "check(20) คืน 20 จึงพิมพ์ 20 ส่วน check(-1) สั่ง raise ValueError ทำให้กระโดดไปที่ except ทันที บรรทัด print(\"end\") จึงไม่ถูกทำ แล้วพิมพ์ Error: อายุติดลบ"
},
{
  id: "P3-039",
  cat: "การจัดการข้อผิดพลาดและไฟล์",
  q: "ถ้าไฟล์ data.txt มีข้อมูลอยู่แล้ว เมื่อเปิดด้วยคำสั่ง open(\"data.txt\", \"w\") จะเกิดอะไรขึ้น",
  choices: ["เกิด FileExistsError", "ข้อมูลเดิมในไฟล์ถูกลบทิ้ง แล้วเริ่มเขียนใหม่ตั้งแต่ต้นไฟล์", "ข้อมูลใหม่จะถูกเขียนต่อท้ายข้อมูลเดิม", "ไฟล์ถูกเปิดเพื่ออ่านอย่างเดียว"],
  answer: 1,
  explain: "โหมด 'w' (write) จะสร้างไฟล์ใหม่ถ้ายังไม่มี และถ้ามีอยู่แล้วจะล้างข้อมูลเดิม (truncate) ก่อนเขียน หากต้องการเขียนต่อท้ายต้องใช้โหมด 'a' (append)"
},
{
  id: "P3-040",
  cat: "การจัดการข้อผิดพลาดและไฟล์",
  q: "ถ้าไฟล์ log.txt ยังไม่มีอยู่ในเครื่อง การเปิดไฟล์ด้วยโหมดใดต่อไปนี้จะทำให้เกิด FileNotFoundError",
  choices: ["\"w\"", "\"a\"", "\"w+\"", "\"r\""],
  answer: 3,
  explain: "โหมด 'r' (read ซึ่งเป็นค่าเริ่มต้น) ต้องการไฟล์ที่มีอยู่แล้ว ถ้าไม่มีจะเกิด FileNotFoundError ส่วนโหมด 'w', 'a' และ 'w+' จะสร้างไฟล์ใหม่ให้อัตโนมัติ"
},
{
  id: "P3-041",
  cat: "การจัดการข้อผิดพลาดและไฟล์",
  q: "ข้อดีหลักของการเปิดไฟล์ด้วยรูปแบบ with open(\"data.txt\") as f: คือข้อใด",
  choices: ["ไฟล์จะถูกปิดให้อัตโนมัติเมื่อออกจากบล็อก with แม้จะเกิด exception ขึ้น", "ทำให้อ่านไฟล์ได้เร็วขึ้นกว่าการใช้ open() ตามปกติ", "ป้องกันไม่ให้ไฟล์ถูกเขียนทับได้", "ทำให้สามารถอ่านและเขียนไฟล์พร้อมกันได้เสมอโดยไม่ต้องระบุโหมด"],
  answer: 0,
  explain: "with statement เป็น context manager ที่รับประกันว่าจะเรียก f.close() ให้เมื่อจบบล็อก ไม่ว่าจะจบตามปกติหรือเกิด exception จึงไม่ต้องเรียก close() เองและลดปัญหาไฟล์ค้างเปิด"
},
{
  id: "P3-042",
  cat: "การเขียนโปรแกรมเชิงวัตถุ",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `class Counter:
    def __init__(self):
        self.n = 0
    def inc(self, k=1):
        self.n += k
        return self

c = Counter()
c.inc().inc(5).inc()
print(c.n)`,
  choices: ["6", "3", "7", "เกิด AttributeError"],
  answer: 2,
  run: true,
  explain: "inc คืนค่า self (ออบเจกต์เดิม) จึงเรียกต่อกันได้ (method chaining): n เพิ่มทีละ 1, 5 และ 1 รวมเป็น 0 + 1 + 5 + 1 = 7"
},
{
  id: "P3-043",
  cat: "การเขียนโปรแกรมเชิงวัตถุ",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `class Dog:
    legs = 4
    def __init__(self, name):
        self.name = name

a = Dog("A")
b = Dog("B")
a.legs = 3
Dog.legs = 5
print(a.legs, b.legs)`,
  choices: ["3 4", "5 5", "3 3", "3 5"],
  answer: 3,
  run: true,
  explain: "a.legs = 3 สร้าง instance attribute ของ a ที่บังค่า class attribute ส่วน b ไม่มี legs ของตัวเองจึงอ่านจากคลาส เมื่อ Dog.legs = 5 แล้ว b.legs จึงได้ 5 แต่ a.legs ยังเป็น 3"
},
{
  id: "P3-044",
  cat: "การเขียนโปรแกรมเชิงวัตถุ",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `class Bag:
    items = []
    def add(self, x):
        self.items.append(x)

b1 = Bag()
b2 = Bag()
b1.add(1)
b2.add(2)
print(b1.items)`,
  choices: ["[1]", "[2]", "[]", "[1, 2]"],
  answer: 3,
  run: true,
  explain: "items ถูกประกาศเป็น class attribute จึงเป็น list เดียวที่ทุกออบเจกต์ใช้ร่วมกัน การ append ผ่าน b1 และ b2 จึงเพิ่มลง list เดียวกัน ได้ [1, 2] (ควรสร้าง self.items = [] ใน __init__ แทน)"
},
{
  id: "P3-045",
  cat: "การเขียนโปรแกรมเชิงวัตถุ",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return "..."

class Cat(Animal):
    def __init__(self, name, color):
        super().__init__(name)
        self.color = color
    def speak(self):
        return self.name + " says meow"

for p in [Animal("X"), Cat("Tom", "gray")]:
    print(p.speak())`,
  choices: ["...\nTom says meow", "...\n...", "X says meow\nTom says meow", "เกิด AttributeError"],
  answer: 0,
  run: true,
  explain: "Cat สืบทอดจาก Animal และเรียก super().__init__(name) เพื่อกำหนด self.name จากนั้น override เมธอด speak ดังนั้น Animal(\"X\").speak() คืน ... และ Cat(\"Tom\", ...).speak() คืน Tom says meow"
},
{
  id: "P3-046",
  cat: "การเขียนโปรแกรมเชิงวัตถุ",
  q: "ผลลัพธ์ของโปรแกรมต่อไปนี้คืออะไร",
  code: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def __str__(self):
        return "(" + str(self.x) + ", " + str(self.y) + ")"

p = Point(3, 4)
q = p
q.x = 10
print(p)`,
  choices: ["(10, 4)", "(3, 4)", "<__main__.Point object>", "(3, 10)"],
  answer: 0,
  run: true,
  explain: "q = p ทำให้ทั้งสองอ้างอิงออบเจกต์เดียวกัน การแก้ q.x จึงเปลี่ยน p.x เป็น 10 ด้วย และ print(p) จะเรียก __str__ ที่กำหนดไว้ จึงแสดง (10, 4)"
},
{
  id: "P3-047",
  cat: "การเขียนโปรแกรมเชิงวัตถุ",
  q: "ในการนิยามเมธอดของคลาสใน Python พารามิเตอร์ตัวแรก self หมายถึงสิ่งใด",
  choices: ["ออบเจกต์ (instance) ที่เรียกใช้เมธอดนั้น", "ชื่อของคลาสนั้น", "คลาสแม่ (superclass) ของคลาสนั้น", "ตัวแปร global ของโมดูล"],
  answer: 0,
  explain: "เมื่อเรียก obj.method() Python จะส่ง obj เข้าไปเป็นอาร์กิวเมนต์ตัวแรกโดยอัตโนมัติ ซึ่งรับไว้ด้วยพารามิเตอร์ self ทำให้เมธอดเข้าถึง attribute ของออบเจกต์นั้นได้ เช่น self.name"
},
{
  id: "P3-048",
  cat: "การเขียนโปรแกรมเชิงวัตถุ",
  q: "เมธอด __init__ ของคลาสจะถูกเรียกให้ทำงานโดยอัตโนมัติเมื่อใด",
  choices: ["เมื่อโปรแกรมเริ่มทำงานและอ่านนิยามคลาส", "เมื่อสร้างออบเจกต์ใหม่จากคลาส เช่น obj = MyClass()", "เมื่อออบเจกต์ถูกลบออกจากหน่วยความจำ", "เมื่อนำออบเจกต์ไปใช้กับฟังก์ชัน print()"],
  answer: 1,
  explain: "__init__ เป็น initializer (constructor) ที่ถูกเรียกทุกครั้งเมื่อสร้าง instance ใหม่ ใช้กำหนดค่าเริ่มต้นของ attribute ส่วน print() จะเรียก __str__ แทน"
},
{
  id: "P3-049",
  cat: "การเขียนโปรแกรมเชิงวัตถุ",
  q: "เมื่อรันโปรแกรมต่อไปนี้ จะได้ผลลัพธ์อย่างไร",
  code: `class A:
    def hello():
        return "hi"

a = A()
print(a.hello())`,
  choices: ["hi", "None", "เกิด TypeError", "เกิด NameError"],
  answer: 2,
  run: true,
  errorType: "TypeError",
  explain: "เมธอด hello ไม่มีพารามิเตอร์ self แต่การเรียก a.hello() จะส่ง a เป็นอาร์กิวเมนต์ตัวแรกให้อัตโนมัติ จึงเกิด TypeError: hello() takes 0 positional arguments but 1 was given"
},
{
  id: "P3-050",
  cat: "การเขียนโปรแกรมเชิงวัตถุ",
  q: "การที่คลาสลูก (subclass) นิยามเมธอดชื่อเดียวกันกับเมธอดในคลาสแม่ เพื่อเปลี่ยนแปลงการทำงานของเมธอดนั้น เรียกว่าอะไร",
  choices: ["Method Overloading", "Encapsulation", "Instantiation", "Method Overriding"],
  answer: 3,
  explain: "Method Overriding คือการที่คลาสลูกเขียนเมธอดชื่อเดิมทับเมธอดของคลาสแม่ เมื่อเรียกผ่านออบเจกต์ของคลาสลูกจะใช้เวอร์ชันของคลาสลูก (ยังเรียกของคลาสแม่ได้ผ่าน super())"
}
);
