export const handleOpenDialog = (id: string) => {
  const dialog = document.getElementById(id) as HTMLDialogElement | null;
  if (dialog) {
    dialog.showModal();
  }
};
