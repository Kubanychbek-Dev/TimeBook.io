window.addEventListener("load", ()=> {

  class LocalStorage {
    constructor() {
      this.key = "times";
    }

    getTimes() {
      let times;
      if(localStorage.getItem(this.key) !== null) {
        times = JSON.parse(localStorage.getItem(this.key));
      }else {
        times = []
      }
      return times
    }

    getId() {
      let count = 0
      
      if(localStorage.getItem(this.key) !== null) {
        const storeId = JSON.parse(localStorage.getItem(this.key))
        storeId.forEach((item) => {
          if(item) {
            count += 1
          }
        })
      }
      return count + 1
    }

    addTimes(date, month, year, hour, minute) {
      let times = this.getTimes()
      let id = this.getId()

      const timeObj = {
        id: id,
        date: date,
        month: month,
        year: year,
        hour: hour,
        minute: minute
      }
      times.push(timeObj)
      localStorage.setItem(this.key, JSON.stringify(times))
    }
  }

  const store = new LocalStorage();

  const btn = document.querySelector(".btn")
  btn.addEventListener("click", addTime)

  function addTime() {

    const flashInside = document.querySelector(".flash-inside")
    let flashNum = Number(flashInside.innerHTML)
    flashInside.classList.add("flash-inside--show")
    const flashInsideShow = document.querySelector(".flash-inside--show")


    let counter = 0;

    if (flashInsideShow) {
      let timerId = setInterval(() => {
        flashInside.innerHTML = flashNum += 1
        counter += 1;

        if (counter === 3) {
          setTimeout(() => { 
            clearInterval(timerId);
            document.querySelector(".flash-inside--show").classList.remove("flash-inside--show")
            document.querySelector(".flash").classList.add("flash-show")
            document.querySelector(".flash-inside").innerHTML = ""
          }, 1000);
         }
      }, 1600);

    }

    setTimeout(() => {
      document.querySelector(".flash-show").classList.remove("flash-show")
      counter = 0
    }, 8000)


    const now = new Date();
    const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
    const plus1ToMonth = now.getMonth() + 1;
    const month = plus1ToMonth < 10 ? "0" + plus1ToMonth : plus1ToMonth;
    const year = now.getFullYear();
    const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
    const minute = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
    
    store.addTimes(date, month, year, hour, minute);
  }



})