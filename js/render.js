export function renderInUT(list, container) {
  container.innerHTML = "";
  list.forEach((value, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `<td>${index + 1}</td>
                       <td>${value.firstName}</td>
                        <td>${value.lastName}</td>
                        <td>${value.age}</td>
                        <td>${value.fatherName}</td>
                        <td class="delete" id=${value.id}>
                           <i class="fas fa-trash"></i>
                        </td>`;

    console.log(value);
    console.log(tr);

    container.appendChild(tr);
  });
}
