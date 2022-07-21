let dataTable

function loadTable(data) {
  $(document).ready( function () {
    dataTable = $('#performances').DataTable({
      "data" : data,
      columns : [
        { data : "date" },
        { data : "target_time" },
        { data : "working_time" },
        { data : "achievement" },
        { data : "overtime" },
        { data : "day" },
      ],
      searching: false
    })
  })
}

const getTableData = async () => {
  const tableData = await window.onload()
  loadTable(tableData)
  return tableData
} 

getTableData()

filterBtn.click( async () => {
  const tableData = await window.onload()
  dataTable.clear()
  dataTable.rows.add(tableData).draw()
})

searchBtn.keyup( async () => {
  const tableData = await window.onload()
  dataTable.clear()
  dataTable.rows.add(tableData).draw()
})


