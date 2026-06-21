import pandas as pd
b=input("what file you want to open: ")
Type=b.rsplit(".")
Type=Type[-1]
if Type=="tsv":
    data = pd.read_csv(b, delimiter='\t')
    c=input('which heading do you want to be the index: ')
    data.set_index(c, inplace=True)
    print(data)
    a=input("please say the index to get the details: ")
    try:
        a=data.loc[a]
        print(a)
    except KeyError:
        print("the index you entered is not in the file")
elif Type=="csv":
    data = pd.read_csv(b)
    c=input('which heading do you want to be the index: ')
    data.set_index(c, inplace=True)
    print(data)
    a=input("please say the index to get the details: ")
    try:
        a=data.loc[a]
        print(a)
    except KeyError:
        print("the index you entered is not in the file")
elif Type=="psv":
        data = pd.read_csv(b, delimiter='|')
        c=input('which heading do you want to be the index: ')
        data.set_index(c, inplace=True)
        print(data)
        a=input("please say the index to get the details: ")
        try:
            a=data.loc[a]
            print(a)
        except KeyError:
            print("the index you entered is not in the file")
elif Type=="txt":
    file=open(b, "r")
    a=file.read()
    print(a)
else:   
    print("the file type you entered is not supported")