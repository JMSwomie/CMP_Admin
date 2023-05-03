import Swal from 'sweetalert2';

export const successAlert = (title, note) => {
  Swal.fire(title, note, 'success');
};
