
const URL = "http://localhost:3000/people";


document.addEventListener('DOMContentLoaded', ()=>{
    console.log('HTML is loaded!! good luck Texas SE-082420!');
    getPeople();
    formPerson();
})


const formPerson = () => {

    const form = document.querySelector("#person-form");
    
    form.addEventListener("submit", event => {
        event.preventDefault();
        newPerson = {
            name: event.target.name.value,
            pronouns: event.target.pronouns.value,
            "alum?": event.target.alum.value,
            "instructor?": event.target.instructor.value,
            github: event.target.github.value,
            profilePicture: event.target.profile.value
        }

        let reqPackage = {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(newPerson)
        }
        fetch(URL, reqPackage)
        .then(res => res.json())
        .then(renderPerson)
        form.reset()
    })
}
const editPerson = (event, person) => {
        event.preventDefault();
        newName = {
            name: event.target.name.value
        }
        let reqPackage = {
            headers: {"Content-Type": "application/json"},
            method: "PATCH",
            body: JSON.stringify(newName)
        }
        fetch(URL+`/${person.id}`, reqPackage)
        .then(res => res.json())
        .then(per => document.querySelector(`.card-title-${per.id}`).innerText = newName.name);
        document.getElementById(`edit_person_${person.id}`).classList.remove("show");
        $(".btn").attr("aria-expanded", "false");
}



const getPeople = async () => {
    const res = await fetch(URL);
    const peopleData = await res.json();
    peopleData.forEach(person => renderPerson(person));
}

const renderPerson = (person) => {
    const people_div = document.querySelector("#people");
    
    let div1 = document.createElement('div');
    div1.classList.add("card", "p-2", "m-2");
    div1.style = "width: 18rem;";


    let img = document.createElement('img');
    img.src = person.profilePicture;
    img.className = "card-img-top";
    if (person["instructor?"]) {
        img.alt = `${person.name} the instructor`
    } else {
        img.alt = `${person.name} the alum`
    }

    let sub_div = document.createElement('div');
    sub_div.className = "card-body";

    let h5 = document.createElement('h5');
    h5.className = `card-title-${person.id}`;
    h5.innerText = person.name;
    

    let p1 = document.createElement('p');
    p1.className = "card-text";
    if (person["instructor?"]) {
        p1.innerText = "Instructor"
    } else {
        p1.innerText = "Alum"
    }
    
    let p2 = document.createElement('p');
    p2.className = "card-text";
    p2.innerText = `Prefered Pronouns: ${person.pronouns}`;
    
    let p3 = document.createElement('p');
    p3.className = "card-text";
    if (person["alum?"]) {
        p3.innerText = `Attended Flatiron? Yes`
    } else {
        p3.innerText = `Attended Flatiron? No`
    }

    let a = document.createElement('a')
    a.href = person.github
    a.classList.add("btn", "btn-primary")
    a.innerText = `Go to ${person.name}'s GitHub`
    

    let a1 = document.createElement('a')
    a1.classList.add("btn", "btn-primary")
    a1.href=`#edit_person_${person.id}`
    $(".btn").attr("data-toggle", "collapse");
    $(".btn").attr("role", "button");
    $(".btn").attr("aria-expanded", "false");
    $(".btn").attr("aria-controls", "collapseFormButton");
    a1.innerText = "Update Person!"

    
    let edit_form = document.createElement('form')
    edit_form.id = `edit_person_${person.id}`
    edit_form.classList.add("collapse", "multi-collapse")
    edit_form.innerHTML = `<div class="form-group">
                <label for="Name">Name</label>
                <input type="text" value = ${person.name} class="form-control" id="name" aria-describedby="nameInput">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>`

    
    sub_div.append(h5,p1,p2,p3,a,a1,edit_form)
    div1.append(img,sub_div)
    people_div.appendChild(div1)
    document.getElementById(`edit_person_${person.id}`).addEventListener("submit", event => editPerson(event, person));

}

