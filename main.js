import { Rive } from "@rive-app/canvas";

// Initialize Rive animation
const canvas = document.getElementById("rive-canvas");

let riveInstance = null;

// Problem data for overlays
const problemsData = {
  1: {
    title: "Проблема с дверцей",
    description:
      "Дверца стиральной машины не закрывается или не открывается должным образом. Проверьте защелку, убедитесь что нет посторонних предметов, мешающих закрытию. При необходимости обратитесь к специалисту для замены механизма.",
  },
  2: {
    title: "Машина не набирает воду",
    description:
      "Стиральная машина не набирает воду или набирает очень медленно. Проверьте водопроводный кран, состояние шлангов, фильтр подачи воды. Убедитесь что программа стирки выбрана правильно.",
  },
  3: {
    title: "Problem 3",
    description:
      "This is the detailed description of problem 3. Here you can add comprehensive information about the issue and potential solutions.",
  },
  4: {
    title: "Problem 4",
    description:
      "This is the detailed description of problem 4. Here you can add comprehensive information about the issue and potential solutions.",
  },
  5: {
    title: "Problem 5",
    description:
      "This is the detailed description of problem 5. Here you can add comprehensive information about the issue and potential solutions.",
  },
  6: {
    title: "Problem 6",
    description:
      "This is the detailed description of problem 6. Here you can add comprehensive information about the issue and potential solutions.",
  },
  7: {
    title: "Problem 7",
    description:
      "This is the detailed description of problem 7. Here you can add comprehensive information about the issue and potential solutions.",
  },
  8: {
    title: "Problem 8",
    description:
      "This is the detailed description of problem 8. Here you can add comprehensive information about the issue and potential solutions.",
  },
  9: {
    title: "Problem 9",
    description:
      "This is the detailed description of problem 9. Here you can add comprehensive information about the issue and potential solutions.",
  },
  10: {
    title: "Problem 10",
    description:
      "This is the detailed description of problem 10. Here you can add comprehensive information about the issue and potential solutions.",
  },
  11: {
    title: "Problem 11",
    description:
      "This is the detailed description of problem 11. Here you can add comprehensive information about the issue and potential solutions.",
  },
  12: {
    title: "Problem 12",
    description:
      "This is the detailed description of problem 12. Here you can add comprehensive information about the issue and potential solutions.",
  },
};

// Handle Rive trigger events
function handleRiveTrigger(event) {
  console.log("=== RIVE EVENT RECEIVED ===");
  console.log("Full event:", event);
  console.log("Event data:", event.data);
  console.log("Event type:", typeof event.data);

  // Try different ways to get the trigger name
  const triggerName1 = event.data?.name;
  const triggerName2 = event.data;
  const triggerName3 = event.name;
  const triggerName4 = event.data?.type;

  console.log("Trigger name (data.name):", triggerName1);
  console.log("Trigger name (data):", triggerName2);
  console.log("Trigger name (name):", triggerName3);
  console.log("Trigger type (data.type):", triggerName4);

  // Get all possible trigger names
  const possibleNames = [
    triggerName1,
    triggerName2,
    triggerName3,
    triggerName4,
  ].filter(Boolean);
  console.log("All possible trigger names:", possibleNames);

  // Check each possible name
  for (const triggerName of possibleNames) {
    console.log(`Checking trigger: "${triggerName}"`);

    // Map your specific trigger names to problem numbers
    if (triggerName === "дверца клик" || triggerName === "дверца клик-") {
      console.log("Opening door problem overlay");
      openProblemOverlay(1);
      return;
    } else if (
      triggerName === "не набирает воду клик" ||
      triggerName === "не набирает воду2"
    ) {
      console.log("Opening water problem overlay");
      openProblemOverlay(2);
      return;
    }
  }

  console.log("No matching trigger found for:", possibleNames);
}

// Create and show overlay
function openProblemOverlay(problemNumber) {
  const problemData = problemsData[problemNumber];

  if (!problemData) {
    console.warn(`No data found for problem ${problemNumber}`);
    return;
  }

  // Remove existing overlay if any
  const existingOverlay = document.getElementById("problem-overlay");
  if (existingOverlay) {
    existingOverlay.remove();
  }

  // Create overlay
  const overlay = document.createElement("div");
  overlay.id = "problem-overlay";
  overlay.className = "overlay";

  overlay.innerHTML = `
    <div class="overlay-content">
      <div class="overlay-header">
        <h2>${problemData.title}</h2>
        <button class="close-btn" onclick="closeProblemOverlay()">✕</button>
      </div>
      <div class="overlay-body">
        <p>${problemData.description}</p>
      </div>
      <div class="overlay-footer">
        <button class="action-btn" onclick="closeProblemOverlay()">Close</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Trigger entrance animation
  setTimeout(() => {
    overlay.classList.add("show");
  }, 10);
}

// Close overlay function
function closeProblemOverlay() {
  const overlay = document.getElementById("problem-overlay");
  if (overlay) {
    overlay.classList.remove("show");
    setTimeout(() => {
      overlay.remove();
    }, 300);
  }
}

// Make closeProblemOverlay globally accessible
window.closeProblemOverlay = closeProblemOverlay;

// Handle pointer down events
function handlePointerDown(event) {
  console.log("Pointer/Mouse down detected");

  // Send pointer down to Rive
  if (riveInstance && riveInstance.pointerDown) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    riveInstance.pointerDown(x, y);
    console.log(`Sent pointerDown to Rive: ${x}, ${y}`);
  }
}

// Handle pointer up events
function handlePointerUp(event) {
  console.log("Pointer/Mouse up detected");

  // Send pointer up to Rive
  if (riveInstance && riveInstance.pointerUp) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    riveInstance.pointerUp(x, y);
    console.log(`Sent pointerUp to Rive: ${x}, ${y}`);
  }

  // Check boolean inputs only after real click
  setTimeout(() => {
    checkBooleanInputs();
  }, 50);
}

// Track previous boolean states to detect changes
let previousBooleanStates = {};

// Check for boolean input changes (for click detection)
function checkBooleanInputs() {
  if (!riveInstance) return;

  try {
    // Try different methods to get inputs
    const inputs =
      riveInstance.stateMachineInputs("State Machine 1") ||
      riveInstance.stateMachineInputs() ||
      riveInstance.inputs;

    if (inputs && inputs.length > 0) {
      console.log("=== CHECKING BOOLEAN INPUTS ===");
      inputs.forEach((input) => {
        if (input.type === "Boolean" || input.type === "boolean") {
          const currentValue = input.value;
          const previousValue = previousBooleanStates[input.name];

          console.log(
            `Input: ${input.name}, Current: ${currentValue}, Previous: ${previousValue}`,
          );

          // Check if boolean changed from false to true (click detected)
          if (currentValue === true && previousValue === false) {
            console.log(`🎯 Boolean input changed: ${input.name} = true`);
            handleBooleanChange(input.name);
          }

          previousBooleanStates[input.name] = currentValue;
        }
      });
    } else {
      console.log("No inputs available in checkBooleanInputs");
    }
  } catch (error) {
    console.error("Error checking boolean inputs:", error);
  }
}

// Handle boolean input changes
function handleBooleanChange(inputName) {
  console.log(`Boolean trigger: ${inputName}`);

  // Map your boolean input names to problems based on your Rive setup
  if (inputName === "Boolean 4") {
    console.log("Opening door problem overlay (Boolean 4)");
    openProblemOverlay(1); // Door problem - дверца клик
  } else if (inputName === "Boolean 1") {
    console.log("Boolean 1 clicked - no action configured");
    // openProblemOverlay(2); // Uncomment when ready
  } else if (inputName === "Boolean 2") {
    console.log("Boolean 2 clicked - no action configured");
    // openProblemOverlay(3); // Uncomment when ready
  } else if (inputName === "Boolean 3") {
    console.log("Boolean 3 clicked - no action configured");
    // openProblemOverlay(4); // Uncomment when ready
  }
}

// Handle state change events
function handleStateChangeEvent(eventName, eventData) {
  console.log(`State change detected: ${eventName}`);

  // Map timeline names to problems
  if (eventName === "Timeline 1") {
    console.log("Opening problem overlay 1 from Timeline 1");
    openProblemOverlay(1);
  } else if (eventName === "Timeline 2") {
    console.log("Opening problem overlay 2 from Timeline 2");
    openProblemOverlay(2);
  } else if (eventName === "дверца клик" || eventName === "дверца клик-") {
    console.log("Opening door problem overlay from state change");
    openProblemOverlay(1);
  } else if (
    eventName === "не набирает воду клик" ||
    eventName === "не набирает воду2"
  ) {
    console.log("Opening water problem overlay from state change");
    openProblemOverlay(2);
  } else {
    console.log(`Unknown state change event: ${eventName}`);
  }
}

// Mouse tracking for cursor following
function handleMouseMove(event) {
  if (!riveInstance) return;

  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const mouseX = (event.clientX - rect.left) * scaleX;
  const mouseY = (event.clientY - rect.top) * scaleY;

  // Normalize coordinates to 0-1 range
  const normalizedX = mouseX / canvas.width;
  const normalizedY = mouseY / canvas.height;

  try {
    // Try to set mouse inputs via state machine inputs
    const inputs = riveInstance.stateMachineInputs();
    if (inputs && inputs.length > 0) {
      // Try common input names for mouse coordinates
      const possibleXNames = [
        "mouseX",
        "Mouse X",
        "cursorX",
        "Cursor X",
        "x",
        "X",
      ];
      const possibleYNames = [
        "mouseY",
        "Mouse Y",
        "cursorY",
        "Cursor Y",
        "y",
        "Y",
      ];

      const mouseXInput = inputs.find((input) =>
        possibleXNames.includes(input.name),
      );
      const mouseYInput = inputs.find((input) =>
        possibleYNames.includes(input.name),
      );

      if (mouseXInput) {
        mouseXInput.value = normalizedX;
      }
      if (mouseYInput) {
        mouseYInput.value = normalizedY;
      }
    }
  } catch (error) {
    // Silently handle if inputs don't exist
  }
}

// Load and play the Rive animation
async function loadRiveAnimation() {
  try {
    riveInstance = new Rive({
      src: "/untitled1.riv",
      canvas: canvas,
      autoplay: true,
      stateMachines: "State Machine 1",
      onLoad: () => {
        console.log("Rive animation loaded successfully");

        // Log all available inputs for debugging
        console.log("Rive instance:", riveInstance);

        try {
          // Try different ways to access inputs
          const inputs1 = riveInstance.stateMachineInputs();
          const inputs2 = riveInstance.stateMachineInputs("State Machine 1");
          const inputs3 = riveInstance.inputs;

          console.log("Method 1 - stateMachineInputs():", inputs1);
          console.log(
            "Method 2 - stateMachineInputs('State Machine 1'):",
            inputs2,
          );
          console.log("Method 3 - inputs:", inputs3);

          // Try to use the one that works
          const workingInputs = inputs1 || inputs2 || inputs3;

          if (workingInputs && workingInputs.length > 0) {
            console.log("Found working inputs:", workingInputs);
            workingInputs.forEach((input) => {
              console.log(
                `Input: "${input.name}", Type: ${input.type}, Value: ${input.value}`,
              );
            });
          } else {
            console.log("No inputs found with any method");
            console.log(
              "Available state machines:",
              riveInstance.stateMachineNames,
            );
          }
        } catch (error) {
          console.error("Error accessing state machine inputs:", error);
        }

        riveInstance.resizeDrawingSurfaceToCanvas();

        // Add mouse move listener after Rive loads
        canvas.addEventListener("mousemove", handleMouseMove);

        // Add pointer down/up listeners for direct interaction
        canvas.addEventListener("pointerdown", handlePointerDown);
        canvas.addEventListener("pointerup", handlePointerUp);
        canvas.addEventListener("mousedown", handlePointerDown);
        canvas.addEventListener("mouseup", handlePointerUp);

        // Wait a bit more for state machine to be fully ready
        setTimeout(() => {
          console.log("=== DELAYED STATE MACHINE CHECK ===");
          const delayedInputs =
            riveInstance.stateMachineInputs("State Machine 1") ||
            riveInstance.stateMachineInputs() ||
            riveInstance.inputs;
          console.log("Delayed inputs check:", delayedInputs);

          if (delayedInputs && delayedInputs.length > 0) {
            delayedInputs.forEach((input) => {
              console.log(
                `Delayed - Input: "${input.name}", Type: ${input.type}, Value: ${input.value}`,
              );
            });
          }
        }, 1000);
      },
      onLoadError: (error) => {
        console.error("Failed to load Rive animation:", error);
        canvas.style.display = "none";
        const errorMsg = document.createElement("p");
        errorMsg.textContent =
          "Failed to load animation. Please check if the file exists.";
        errorMsg.style.color = "red";
        document.body.appendChild(errorMsg);
      },
      onRiveEventReceived: handleRiveTrigger,
    });
  } catch (error) {
    console.error("Error initializing Rive:", error);
  }
}

// Resize handler
window.addEventListener("resize", () => {
  if (riveInstance) {
    riveInstance.resizeDrawingSurfaceToCanvas();
  }
});

// Initialize when page loads
document.addEventListener("DOMContentLoaded", loadRiveAnimation);
