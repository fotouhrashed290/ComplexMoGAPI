document.addEventListener("DOMContentLoaded", function() {
    // Initialization code if needed for existing questions
    const efactorInput = document.getElementById('efactorInput');
    efactorInput.addEventListener('input', updateEfactorCircle);
});

function updateEfactorCircle() {
    const efactorValue = document.getElementById('efactorInput').value;
    const efactorCircle = document.getElementById('efactorCircle');
    efactorCircle.textContent = efactorValue;

    if (efactorValue) {
        efactorCircle.classList.remove('hidden');
    } else {
        efactorCircle.classList.add('hidden');
    }
}


let lastShownBar = null; // Variable to keep track of the last shown bar

function showLayer(layerName, isVisible) {
    var layer = document.querySelector('.' + layerName);
    if (layer) {
        layer.style.visibility = isVisible ? 'visible' : 'hidden';
        layer.setAttribute('data-visible', isVisible ? 'true' : 'false');
    }
}

function updateLayerVisibility(selectedValue, questionNumber) {
    var points = parseInt(selectedValue);

    if (questionNumber >= 1 && questionNumber <= 16) {
        showLayer(`g${questionNumber}`, points >= 3);
        showLayer(`yy${questionNumber}`, points === 2);
        showLayer(`rr${questionNumber}`, points === 1);
    }

    // Calculate and display the total points
    displayTotalPoints();
}

function displayTotalPoints() {
    let totalPoints = 0;
    let zeroPointsCount = 0;

    for (let i = 1; i <= 16; i++) {
        const selectElement = document.querySelector(`select[name="question${i}"]`);
        const points = parseInt(selectElement.value);

        if (points === 0) {
            zeroPointsCount++;
        }

        totalPoints += points;
    }

    // Adjust the divisor based on the number of zero points
    const divisor = 50 - (3 * zeroPointsCount);

    // Divide the total points by the adjusted divisor and multiply by 100
    const normalizedPoints = (totalPoints / divisor) * 100;
    document.getElementById('pointsCircle').textContent = normalizedPoints.toFixed(0);

    // Update the bar image based on normalized points
    updateBarImage(normalizedPoints);
}

function updateBarImage(points) {
    const barMapping = {
        28: '.bar_28',
        30: '.bar_30',
        32: '.bar_32',
        34: '.bar_34',
        36: '.bar_36',
        38: '.bar_38',
        40: '.bar_40',
        42: '.bar_42',
        44: '.bar_44',
        46: '.bar_46',
        48: '.bar_48',
        49: '.bar_49',
        50: '.bar_50',
        52: '.bar_52',
        54: '.bar_54',
        56: '.bar_56',
        58: '.bar_58',
        60: '.bar_60',
        62: '.bar_62',
        64: '.bar_64',
        66: '.bar_66',
        68: '.bar_68',
        70: '.bar_70',
        72: '.bar_72',
        74: '.bar_74',
        75: '.bar_75',
        76: '.bar_76',
        78: '.bar_78',
        80: '.bar_80',
        82: '.bar_82',
        84: '.bar_84',
        86: '.bar_86',
        88: '.bar_88',
        90: '.bar_90',
        92: '.bar_92',
        94: '.bar_94',
        96: '.bar_96',
        98: '.bar_98',
        100: '.bar_100'
    };

    // Hide the last shown bar if there was one
    if (lastShownBar) {
        document.querySelector(lastShownBar).style.visibility = 'hidden';
    }

    // Determine the current bar to display
    let currentBarKey = Object.keys(barMapping).reduce((prev, curr) => {
        return (Math.abs(curr - points) < Math.abs(prev - points) ? curr : prev);
    });

    let currentBarSelector = barMapping[currentBarKey];

    // Show the current bar
    if (currentBarSelector) {
        document.querySelector(currentBarSelector).style.visibility = 'visible';
        lastShownBar = currentBarSelector;
    }
}

