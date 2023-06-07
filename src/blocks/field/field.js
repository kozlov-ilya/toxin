const fields = document.querySelectorAll('.field');

// Hover handlers
function handleFieldHovered(e) {
  e.target.classList.add('field_hovered');
}

function handleFieldUnhovered(e) {
  e.target.classList.remove('field_hovered');
}

// Focus handlers
function handleFieldFocused(e) {
  e.target.classList.add('field_focused');
}

function handleFieldUnfocused(e) {
  e.target.classList.remove('field_focused');
}

// Add handlers to events
fields.forEach((e) => {
  // Add hover event handlers
  e.addEventListener('mouseover', handleFieldHovered);
  e.addEventListener('mouseout', handleFieldUnhovered);
  // Add focus event handlers
  e.addEventListener('focus', handleFieldFocused);
  e.addEventListener('blur', handleFieldUnfocused);
});
