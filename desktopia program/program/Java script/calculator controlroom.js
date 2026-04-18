const display = document.getElementById('display');

function appendNumber(num) {
  if (display.value === '0' || display.value === 'Error') {
    display.value = num;
  } else {
    display.value += num;
  }
}

function appendOperator(op) {
  if (display.value === '' && (op === '+' || op === '-' || op === '*' || op === '/' || op === '^')) return;

  const lastChar = display.value.slice(-1);
  if (['+', '-', '*', '/', '^'].includes(lastChar)) {
    display.value = display.value.slice(0, -1) + op;
  } else {
    display.value += op;
  }
}

function clearAll() {
  display.value = '';
}

function clearEntry() {
  display.value = '0';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
  if (display.value === '') display.value = '0';
}

function percentage() {
  try {
    let val = parseFloat(display.value);
    display.value = (val / 100).toString();
  } catch {
    display.value = 'Error';
  }
}

function sqrt() {
  try {
    let val = parseFloat(display.value);
    if (val < 0) {
      display.value = 'Error';
    } else {
      display.value = Math.sqrt(val).toString();
    }
  } catch {
    display.value = 'Error';
  }
}

function calculate() {
  try {
    let expression = display.value.replace(/÷/g, '/').replace(/×/g, '*');

    // Replace ^ with Math.pow calls
    expression = parsePower(expression);

    // Evaluate the expression safely
    let result = Function('"use strict";return (' + expression + ')')();

    if (typeof result === 'number' && isFinite(result)) {
      display.value = result.toString();
    } else {
      display.value = 'Error';
    }
  } catch {
    display.value = 'Error';
  }
}

function parsePower(expr) {
  // Convert a^b into Math.pow(a,b)
  // This handles only simple power expressions, chained powers will be handled recursively
  while (expr.includes('^')) {
    expr = expr.replace(/(\d+\.?\d*|\([^\(\)]+\))\^(\d+\.?\d*|\([^\(\)]+\))/g, 'Math.pow($1,$2)');
  }
  return expr;
}

// Keyboard support:
document.addEventListener('keydown', e => {
  if (e.key >= '0' && e.key <= '9') {
    appendNumber(e.key);
  } else if (e.key === '.') {
    appendNumber('.');
  } else if (['+', '-', '*', '/'].includes(e.key)) {
    appendOperator(e.key);
  } else if (e.key === 'Enter' || e.key === '=') {
    e.preventDefault();
    calculate();
  } else if (e.key === 'Backspace') {
    deleteLast();
  } else if (e.key.toLowerCase() === 'c') {
    clearAll();
  }
});

clearAll();