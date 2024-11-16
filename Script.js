let userInfo = document.getElementById('user-info');
let dropdownMenu = document.getElementById('dropdown-menu');
let CreateButton = document.getElementById('Create-Btn');
let Name = document.getElementById('Input-Name');
let Age = document.getElementById('Input-Age');
let Occupation = document.getElementById('Input-Occupation');
let Location = document.getElementById('Input-Location');
let DeleteAll = document.getElementById('Delete-All-Btn');


let Mood = "Create";
let tmp;

// ----------------- Saved Data On LocalStorage -----------------

let UsersData = localStorage.Users ? JSON.parse(localStorage.Users) : [];

// ------------ Create User ------------
function Create_User() {
    const DataObj = {
        Name: Name.value.toLowerCase(),
        Age: Age.value,
        Occupation: Occupation.value,
        Location: Location.value
    };
    if(Mood === "Create"){
        UsersData.push(DataObj);
    }else{
        UsersData[tmp] = DataObj;
        Mood = "Create";
        CreateButton.innerHTML = `<i class="fa-solid fa-plus"></i> Add New`;
    }
    localStorage.setItem('Users', JSON.stringify(UsersData));
    ClearData();
    Read_Data();
}
// ------------ Clear Data OnClick ------------
function ClearData(){
    Name.value = '';
    Age.value = '';
    Occupation.value = '';
    Location.value = '';
}
// ------------ Read Data OnClick ------------
CreateButton.onclick = function() {
    if(Name.value !== '' && Age.value !== '' && Occupation.value !== '' && Location.value !== ''){
        Create_User();
        Read_Data();
    }else{
        return;
    }
};
// ------------ Read Data Table ------------
function Read_Data(){
    let table = '';
        for(let i = 0; i < UsersData.length; i++){
            table += `
                <tr class="border-b border-slate-700 text-white hover:bg-slate-900">
                        <td class="px-6 py-4 text-sm">${UsersData[i].Name}</td>
                        <td class="px-6 py-4 text-sm">${UsersData[i].Age}</td>
                        <td class="px-6 py-4 text-sm">${UsersData[i].Occupation}</td>
                        <td class="px-6 py-4 text-sm">${UsersData[i].Location}</td>
                        <td class="px-6 py-4 m-auto text-sm font-semibold text-red-500"><i onclick="Delete_User(${i})" class="fa-solid fa-trash cursor-pointer hover:bg-red-100 rounded p-1"></i></td>
                        <td class="px-6 py-4 m-auto text-sm font-semibold text-blue-500"><i onclick="Update_User(${i})" class="fa-solid fa-pen-to-square hover:bg-blue-100 p-1 rounded cursor-pointer"></i></td>
                    </tr>
            `;
        }
        document.getElementById("Tbody").innerHTML = table;

    if (UsersData.length > 0) {
        DeleteAll.innerHTML = `<button onclick="DeleteAllUsers()" class="fixed bottom-3 text-red-500 w-10 h-8 transition-all duration-500 ease-in-out hover:w-32 overflow-hidden cursor-pointer rounded font-semibold bg-red-200 py-1 px-2 shadow-md shadow-black-900"><i class="fa-solid fa-trash"></i> Delete All ${UsersData.length}</span></button>
`;
    } else {
        DeleteAll.innerHTML = "";
    }
}

// ------------ Delete User ------------

function Delete_User(index){
    UsersData.splice(index,1);
    localStorage.Users = JSON.stringify(UsersData);
    Read_Data();
}

// ------------ Delete All Users ------------

function DeleteAllUsers(){
    UsersData.splice(0,UsersData.length);
    localStorage.Users = JSON.stringify(UsersData);
    Read_Data();
}

// --------------- Update User ---------------

function Update_User(i){
    Name.value = UsersData[i].Name;
    Age.value = UsersData[i].Age;
    Occupation.value = UsersData[i].Occupation;
    Location.value = UsersData[i].Location;
    tmp = i;
    Mood = "Update";
    CreateButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Update`;
    scroll({
        top:0,
        behavior:"smooth",
    })
}

function Search_User(value){
    if(value.length > 0){
        document.getElementById("Search-Icon").classList.add("hidden");
    }else{
        document.getElementById("Search-Icon").classList.remove("hidden");
    }
    let table = "";
        for(let i = 0; i < UsersData.length; i++){
            if(UsersData[i].Name.includes(value.toLowerCase())){
            table += `
            <tr class="border-b border-slate-700 text-white hover:bg-slate-900">
                    <td class="px-6 py-4 text-sm">${UsersData[i].Name}</td>
                    <td class="px-6 py-4 text-sm">${UsersData[i].Age}</td>
                    <td class="px-6 py-4 text-sm">${UsersData[i].Occupation}</td>
                    <td class="px-6 py-4 text-sm">${UsersData[i].Location}</td>
                    <td class="px-6 py-4 m-auto text-sm font-semibold text-red-500"><i onclick="Delete_User(${i})" class="fa-solid fa-trash cursor-pointer hover:bg-red-100 rounded p-1"></i></td>
                    <td class="px-6 py-4 m-auto text-sm font-semibold text-blue-500"><i onclick="Update_User(${i})" class="fa-solid fa-pen-to-square hover:bg-blue-100 p-1 rounded cursor-pointer"></i></td>
                </tr>
        `;
    }
    document.getElementById("Tbody").innerHTML = table;
        }
}

Read_Data();