import tkinter as tk
from tkinter import messagebox, simpledialog
import mysql.connector

# Database Connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Sarvesh@9881",
    database="course_management"
)
cursor = db.cursor()
#ADMIN
def add_course():
    cid = simpledialog.askinteger("Course", "Course ID")
    name = simpledialog.askstring("Course", "Course Name")
    cursor.execute(
        "INSERT INTO courses(course_id,course_name) VALUES(%s,%s)",
        (cid, name)
    )
    db.commit()
    messagebox.showinfo("Success", "Course Added")

def delete_course():
    cid = simpledialog.askinteger("Delete", "Course ID")
    cursor.execute(
        "DELETE FROM courses WHERE course_id=%s",
        (cid,)
    )
    db.commit()
    messagebox.showinfo("Success", "Course Deleted")

def view_courses():
    cursor.execute("SELECT * FROM courses")
    data = cursor.fetchall()
    text = ""
    for row in data:
        text += str(row) + "\n"
    messagebox.showinfo("Courses", text)

def admin_menu():
    w = tk.Toplevel(root)
    w.title("Admin Menu")

    tk.Button(w,text="Add Course",
              command=add_course).pack(fill="x")
    tk.Button(w,text="Delete Course",
              command=delete_course).pack(fill="x")
    tk.Button(w,text="View Courses",
              command=view_courses).pack(fill="x")

def admin_login():
    user = simpledialog.askstring("Admin","Username")
    pwd = simpledialog.askstring("Admin","Password",show="*")

    cursor.execute(
        "SELECT * FROM admin WHERE username=%s AND password=%s",
        (user,pwd)
    )
    if cursor.fetchone():
        admin_menu()
    else:
        messagebox.showerror("Error","Invalid Login") 
        
#STUDENT 
def student_register():

    name = simpledialog.askstring("Register","Name")
    username = simpledialog.askstring("Register","Username")
    password = simpledialog.askstring("Register","Password")
    cursor.execute(
        """
        INSERT INTO students(name,username,password)
        VALUES(%s,%s,%s)
        """,
        (name,username,password)
    )
    db.commit()
    messagebox.showinfo("Success","Registered")

def enroll_course(student_id):
    cid = simpledialog.askinteger(
        "Enroll",
        "Enter Course ID"
    )

    cursor.execute(
        """
        INSERT INTO enrollments(student_id,course_id)
        VALUES(%s,%s)
        """,
        (student_id,cid)
    )

    db.commit()
    messagebox.showinfo(
        "Success",
        "Course Enrolled"
    )
    
    
def my_courses(student_id):
    cursor.execute(
        """
        SELECT c.course_id,c.course_name
        FROM c courses
        JOIN enrollments e
        ON c.course_id=e.course_id
        WHERE e.student_id=%s
        """,
        (student_id,)
    )
    rows = cursor.fetchall()
    text = ""
    for row in rows:
        text += str(row) + "\n"
    messagebox.showinfo(
        "My Courses",
        text
    )

def student_menu(student_id):
    w = tk.Toplevel(root)
    w.title("Student Menu")

    tk.Button(
        w,
        text="View Courses",
        command=view_courses
    ).pack(fill="x")
    tk.Button(
        w,
        text="Enroll Course",
        command=lambda:
        enroll_course(student_id)
    ).pack(fill="x")
    tk.Button(
        w,
        text="My Courses",
        command=lambda:
        my_courses(student_id)
    ).pack(fill="x")

def student_login():

    user = simpledialog.askstring(
        "Login",
        "Username"
    )
    pwd = simpledialog.askstring(
        "Login",
        "Password",
        show="*"
    )
    cursor.execute(
        """
        SELECT *
        FROM students
        WHERE username=%s
        AND password=%s
        """,
        (user,pwd)
    )
    row = cursor.fetchone()
    if row:

        student_id = row[3]

        messagebox.showinfo(
            "Success",
            "Login Successful"
        )
        student_menu(student_id)
    else:
        messagebox.showerror(
            "Error",
            "Invalid Login"
        )

# MAIN WINDOW
root = tk.Tk()
root.title("Course Management System")
root.geometry("400x300")

tk.Label(
    root,
    text="Course Management System",
    font=("Arial",16)
).pack(pady=20)

tk.Button(
    root,
    text="Admin Login",
    command=admin_login
).pack(fill="x", padx=20, pady=5)

tk.Button(
    root,
    text="Student Register",
    command=student_register
).pack(fill="x", padx=20, pady=5)

tk.Button(
    root,
    text="Student Login",
    command=student_login
).pack(fill="x", padx=20, pady=5)

root.mainloop()

cursor.close()
db.close()