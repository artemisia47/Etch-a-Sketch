// Select elements
const container = document.querySelector(".grid-container");
const setGridSizeButton = document.getElementById("gridRange");
const colorBtn = document.querySelector(".colorBtn");
const colorShow = document.querySelector(".colorShow");
const colorPicker = document.getElementById("colorPicker");
const eraserButton = document.querySelector(".eraserBtn");
const clearButton = document.querySelector(".clearBtn");
const palette = document.getElementById("palette");

let selectedColor = "#000000"; // Default color
let eraserActive = false;
let isDrawing = false; // Variable to track if left-click is pressed

// Create the grid dynamically based on size
function createGrid(size) {
    container.innerHTML = ""; // Clear any existing grid
    container.style.setProperty("--grid-size", size); // Update the grid size via CSS variable

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("grid-square");

        // Add event listener for mouse down to start drawing
        square.addEventListener("mousedown", (e) => {
            if (e.button === 0) { // 0 is the left mouse button
                isDrawing = true;
                // If eraser is active, erase, otherwise, color the square
                if (eraserActive) {
                    square.style.backgroundColor = "white";
                } else {
                    square.style.backgroundColor = selectedColor;
                }
                document.body.classList.add("drawing-cursor"); // Change cursor

            }
        });

        // Add event listener to stop drawing when mouse is released
        square.addEventListener("mouseup", () => {
            isDrawing = false;
            document.body.classList.remove("drawing-cursor"); // Reset cursor
        });

        // Add event listener for mouse leaving the square (to stop drawing)


        container.appendChild(square);
    }

    // Add a single event listener to the grid container to handle continuous drawing
    container.addEventListener("mousemove", (e) => {
        if (isDrawing && e.target.classList.contains("grid-square")) {
            const square = e.target;

            // If eraser is active, erase, otherwise, color the square
            if (eraserActive) {
                square.style.backgroundColor = "white";
            } else {
                square.style.backgroundColor = selectedColor;
            }
        }
    });
}

// Event listener for the color palette
palette.addEventListener("click", (e) => {
    if (e.target.classList.contains("color-box")) {
        selectedColor = e.target.style.backgroundColor;
        colorShow.style.backgroundColor = selectedColor; // Update color preview
    }
});

// Event listener for the "Pick Color" button
colorBtn.addEventListener("click", () => {
    // Show the color picker input when the button is clicked
    colorPicker.click();
});

// Event listener for the color picker input
colorPicker.addEventListener("input", (e) => {
    selectedColor = e.target.value; // Update the selected color
    colorShow.style.backgroundColor = selectedColor; // Update the preview color
});

// Enable/disable the eraser
eraserButton.addEventListener("click", () => {
    eraserActive = !eraserActive;
    eraserButton.textContent = eraserActive ? "Eraser: ON" : "Eraser: OFF";
});

// Clear the grid
clearButton.addEventListener("click", () => {
    const squares = document.querySelectorAll(".grid-square");
    squares.forEach((square) => {
        square.style.backgroundColor = "white"; // Reset to white
    });
});

// Update grid size based on the range slider
setGridSizeButton.addEventListener("input", (e) => {
    const size = e.target.value;
    document.getElementById("sliderValue").textContent = `${size} x ${size}`;
    createGrid(size); // Recreate grid with the new size
});

// Initialize the default grid size (16x16)
createGrid(16);
