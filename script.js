let employeeList = [];
let employeeId = 0;

function onFormSubmit(event) {
  event.preventDefault();

  const formData = {
    id: employeeId++,
    name: document.getElementById("employeeName").value,
    email: document.getElementById("employeeEmail").value,
    phone: document.getElementById("employeePhone").value,
  };

  if (!validateEmail(formData.email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!validatePhone(formData.phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  employeeList.push(formData);
  renderTable();
  resetForm();
}

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validatePhone(phone) {
  const phonePattern = /^\d{10}$/;
  return phonePattern.test(phone);
}

function renderTable() {
  const tableBody = document.querySelector("#employeeList tbody");
  tableBody.innerHTML = "";

  employeeList.forEach((employee) => {
    let row = `<tr>
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.email}</td>
            <td>${employee.phone}</td>
            <td>
                <button onclick="onEdit(${employee.id})">Edit</button>
                <button onclick="onDelete(${employee.id})">Delete</button>
            </td>
        </tr>`;
    tableBody.innerHTML += row;
  });
}

function resetForm() {
  document.getElementById("employeeName").value = "";
  document.getElementById("employeeEmail").value = "";
  document.getElementById("employeePhone").value = "";
}

function onEdit(id) {
  const employee = employeeList.find((emp) => emp.id === id);
  document.getElementById("employeeName").value = employee.name;
  document.getElementById("employeeEmail").value = employee.email;
  document.getElementById("employeePhone").value = employee.phone;

  onDelete(id); // Remove the current record to avoid duplication on resubmit
}

function onDelete(id) {
  employeeList = employeeList.filter((emp) => emp.id !== id);
  renderTable();
}

function toggleForm() {
  var form = document.getElementById("employeeDetailForm");
  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}
