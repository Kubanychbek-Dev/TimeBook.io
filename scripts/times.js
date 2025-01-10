window.addEventListener("load", () => {

  function displayTimes() {

    if(localStorage.getItem("times") !== null) {
      const times = JSON.parse(localStorage.getItem("times"))
      const timeMenu = document.querySelector(".time__menu")
      
      times.map((time) => {
        const li = document.createElement("li")
        li.setAttribute("id", time.id)
        li.classList.add("time__item")
        li.innerHTML = `
        ${time.date}/${time.month}/${time.year}-${time.hour}:${time.minute} <span id=${time.id} class="time__btn">X</span>
        `
        timeMenu.append(li)
      })
    }else {
      const timeMenu = document.querySelector(".time__menu")
      const h1 = document.createElement("h1")
      h1.innerText = "You don't have any entries yet"
      timeMenu.append(h1)
    }

    function deleteStore(id) {
      let store = JSON.parse(localStorage.getItem("times"))
      if(store.length === 1) {
        localStorage.clear();
      }else {
        const filtered = store.filter(item => item.id !== id)
        localStorage.setItem("times", JSON.stringify(filtered));
      }
    }

    const timeBtns = document.querySelectorAll(".time__btn")
    timeBtns.forEach((item) => {
      item.addEventListener("click", () => {
        const id = item.getAttribute("id")
        const idIsNum = Number(id)
        document.getElementById(id).remove()
        deleteStore(idIsNum)
      })
    })


  }

  displayTimes();



})