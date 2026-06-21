import csv
a=0
file_name=input("In which file you want to write {please be the following: csv, tsv, psv or txt file}: ")
Type=file_name.rsplit(".")
Type=Type[-1]
b=int(input("How much line you want to write: "))
if Type=="csv":
    while a!=b:
        a+=1
        opened=open(file_name, "a", newline="")
        v1=input("value 1: ")
        v2=input("value 2: ")
        v3=input("value 3: ")
        writer=csv.writer(opened)
        writer.writerow([v1,v2,v3])
        opened.close()
    if a==b:
        input("Thank you for using the program")
elif Type=="tsv":
    while a!=b:
        a+=1
        opened=open(file_name, "a", newline="")
        v1=input("value 1: ")
        v2=input("value 2: ")
        v3=input("value 3: ")
        writer=csv.writer(opened, delimiter="\t")
        writer.writerow([v1,v2,v3])
        opened.close()
    if a==b:
        input("Thank you for using the program")

elif Type=="psv":
    while a!=b:
        opened=open(file_name, "a", newline="")
        a+=1
        v1=input("value 1: ")
        v2=input("value 2: ")
        v3=input("value 3: ")
        writer=csv.writer(opened, delimiter="|")
        writer.writerow([v1,v2,v3])
        opened.close()
    if a==b:
        input("Thank you for using the program")

elif Type=="txt":
    a+=1
    opened=open(file_name, "a", newline="")
    print("as you are using txt, there is only one input for you")
    v1=input("value: ")
    opened.write(v1)
    opened.close()
    input("Thank you for using the program")

else:
    print("sorry! I can't understand")