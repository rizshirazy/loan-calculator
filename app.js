// Listen fo submit
document.getElementById('loan-form').addEventListener('submit', calculateResult);

// calculate result
function calculateResult(e) {
  console.log('calculating...');

  // UI Vars
  const amountUI = document.getElementById('amount');
  const interestUI = document.getElementById('interest');
  const yearsUI = document.getElementById('years');
  const monthlyPaymentUI = document.getElementById('monthly-payment');
  const totalPaymentUI = document.getElementById('total-payment');
  const totalInterestUI = document.getElementById('total-interest');

  const principal = parseFloat(amountUI.value);
  const calculateInterest = parseFloat(interestUI.value) / 100 / 12;
  const calculatePayments = parseFloat(yearsUI.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculateInterest, calculatePayments);
  const monthly = (principal * x * calculateInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPaymentUI.value = monthly.toFixed(2);
    totalPaymentUI.value = (monthly * calculatePayments).toFixed(2);
    totalInterestUI.value = ((monthly * calculatePayments) - principal).toFixed(2);
  } else {
    showError('Please check your number');
  }

  e.preventDefault();
}

// Show error
function showError(error) {
  // Get element
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Create a div
  const errorDiv = document.createElement('div');
  // Add class
  errorDiv.className = 'alert alert-danger';
  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 second
  setTimeout(clearError, 3000);

}

// Clear error
function clearError() {
  document.querySelector('.alert').remove();
}