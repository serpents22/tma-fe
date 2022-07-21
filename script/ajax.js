const getUrl = 'http://localhost:3000/performance'
let startDate = $("#startDate")
let endDate = $("#endDate")
let filterBtn = $("#filter")
let searchBtn = $("#search")


async function fetchData() {
  const params = {
    startDate: startDate.val(),
    endDate: endDate.val(),
    search: searchBtn.val().toLowerCase()
  }
  try {
    const res = await fetch(getUrl + '?' + ( new URLSearchParams( params ) ).toString() )
    const performances = await res.json()
    return performances
  } catch (error) {
      console.log(error.message)
  }
}


window.onload = async () => {
  const data = await fetchData()
  console.log(data)
  return data
}

filterBtn.click( async () => {
  const data = await fetchData()
  console.log(data)
  return data
})


searchBtn.keyup( async () => {
  const data = await fetchData()
  console.log(data)
  return data
})





