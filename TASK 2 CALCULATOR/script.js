const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");
const themeToggleBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");
const toggleIcon = document.querySelector(".toggler-icon");
let isDark = true;

// Function to handle button click
const handleClick = (item) => {
  if (item.id == "clear") {
    display.innerText = "";
  } else if (item.id == "backspace") {
    let string = display.innerText.toString();
    display.innerText = string.substr(0, string.length - 1);
  } else if (display.innerText != "" && item.id == "equal") {
    display.innerText = eval(display.innerText);
  } else if (display.innerText == "" && item.id == "equal") {
    display.innerText = "Empty!";
    setTimeout(() => (display.innerText = ""), 2000);
  } else {
    display.innerText += item.id;
  }
};

// Event listener for button clicks
buttons.forEach((item) => {
  item.onclick = () => {
    handleClick(item);
  };
});

// Event listener for keyboard input
document.addEventListener("keydown", (event) => {
  const key = event.key;
  const button = document.getElementById(key);

  if (button) {
    handleClick(button);
    button.classList.add("pressed"); // Optional: Add a visual effect for key press
    setTimeout(() => button.classList.remove("pressed"), 100); // Remove the visual effect after 100ms
  }
});

// Theme toggle button click event
themeToggleBtn.onclick = () => {
  calculator.classList.toggle("dark");
  themeToggleBtn.classList.toggle("active");
  isDark = !isDark;
};
