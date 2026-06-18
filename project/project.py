import tkinter as tk
from tkinter import messagebox,simpledialog
import mysql.connector

db= mysql.connector.connect(
    host="localhost",
    user="root",
    password="Sarvesh@9881",
    database="manage"
)
cursor=db.cursor()

def add_course():
    cid=simpledialog.askinteger("Course","Course ID")
    cname=simpledialog.askstring("Course","Course Name")
    cursor.execute(
        "INSERT INTO COURSE(course_id,course_name)VALUES(%s,%s)",
        (cid,cname)
        
    )
    db.commit()
    messagebox.showinfo("success","Add Course Successfully")
    
def delete_course():
        cdel= simpledialog.askinteger("Delete Course","Enter Course Id ")
        cursor.execute(
            "SELECT * FROM COURSE WHERE COURSE_ID=%s",
            (cdel,)
        )
        
        data=cursor.fetchone()
        
       
        if data:
             cursor.execute(
            "DELETE FROM COURSE WHERE COURSE_ID=%s",
            (cdel,)
        )
             db.commit()
             messagebox.showinfo(
                 "Successfully",
                 "Course Deleted Successfully"
             )
        else:
            messagebox.showerror("Error","Course Is Not Available")
            
def view_course():
                cursor.execute("SELECT * FROM COURSE")
                data =cursor.fetchall()
                text=""
                for row in data:
                    text+=str(row)+"\n"

                    messagebox.showinfo("courses",text)
def admin_menu():
    w=tk.Toplevel(root)
    w.title("DashBoard")
    
    tk.Button(w,text="Add Course",
              command=add_course).pack(fill="x")
    tk.Button(w,text="Delete Course",
              command=delete_course).pack(fill="x")
    tk.Button(w,text="View Courses",
              command=view_course).pack(fill="x")
                    
def admin_login():
    user=simpledialog.askstring("Login","Username")               
    pswd=simpledialog.askinteger("Login","Password") 
    
    cursor.execute("SELECT * FROM ADMINN WHERE USERNAME=%s AND PASSWORD=%s",
                   (user,pswd))
    if cursor.fetchone():
        admin_menu()
    else:
        messagebox.showerror("Error","Invalid Login")
        
def student_register():
    name=simpledialog.askstring("Register","Enter Name")
    username=simpledialog.askstring("Register","Enter Username")
    password=simpledialog.askinteger("Register","Enter Password")
    
    if name is None or username is None or password is None:
        messagebox.showerror(
            "Error",
            "Registration Cancelled"
        )
        return
    
    cursor.execute("""
                 INSERT INTO STUDENT_REG(NAME,USERNAME,PASSWORD)
                 VALUES(%s,%s,%s)  
                   """,(name,username,password))
    db.commit()
    messagebox.showinfo("Register","Register Successfully")

def enroll_course(student_id):
    Cid=simpledialog.askinteger(
        "course",
        "Enter COurse ID"
    )     
    cursor.execute(
        """INSERT INTO ENROLL(student_id,course_id)
        VALUES(%s,%s)""",
        (student_id,Cid)
    )
    db.commit()
    
    messagebox.showinfo("Success",
                        "Course Enrolled Successfully")
    
def my_courses(student_id):
    cursor.execute(
        """
        SELECT c.course_id,c.course_name
        FROM course c
        JOIN enroll e
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
        command=view_course
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
    user=simpledialog.askstring("Login","Enter Username")
    pswd= simpledialog.askinteger("Login","Enter Password")
    
    cursor.execute("""
                   SELECT * FROM STUDENT_REG
                   WHERE USERNAME=%s AND PASSWORD=%s"""
                   , (user,pswd))

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
   
             
#gui
root=tk.Tk()
root.title("Course Management")
tk.Button(
    root,
    text="Admin Login",
    command=admin_login
).pack(padx=20,pady=10)
tk.Button(
    root,
    text="Student Register",
    command=student_register
).pack(padx=20,pady=10)
tk.Button(
    root,
    text="Student login",
    command=student_login
).pack(padx=20,pady=10)



root.mainloop()