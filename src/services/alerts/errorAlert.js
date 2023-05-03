import Swal from 'sweetalert2';

export const errorAlert = (title, note) => {
  Swal.fire(title, note, 'error');
};
