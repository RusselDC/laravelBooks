
let dropDown = false;   
const setDropdown = (dropDown) => {
    const menu = document.getElementById('dropdownMenu');
    let className = menu.className; 
    className = (dropDown) ? className.replace('hidden','absolute') : className.replace('absolute','hidden');
    menu.className = className;
}

