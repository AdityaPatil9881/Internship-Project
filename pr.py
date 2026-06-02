from tkinter import *
import string
import random

def generate_password():
    password = int(e1.get())

    s1 = string.ascii_letters
    s2 = string.ascii_lowercase
    s3 = string.ascii_uppercase
    s4 = string.digits

    s = []
    s.extend(list(s1))
    s.extend(list(s2))
    s.extend(list(s3))
    s.extend(list(s4))

    random.shuffle(s)

    result.delete(0, END)
    result.insert(0, "".join(s[0:password]))

root = Tk()
root.title("Password Generator")
root.geometry("300x150")

Label(root, text="Enter Password Length").pack()

e1 = Entry(root)
e1.pack()

Button(root, text="Generate Password", command=generate_password).pack(pady=5)

result = Entry(root, width=30)
result.pack()

root.mainloop()