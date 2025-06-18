// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Impact Distribution Chart
const impactCtx = document.getElementById('impactChart').getContext('2d');
new Chart(impactCtx, {
    type: 'doughnut',
    data: {
        labels: ['PWD Support', 'Education', 'Startups', 'Women Empowerment'],
        datasets: [{
            data: [40, 30, 20, 10],
            backgroundColor: [
                '#003B71',
                '#00A7E1',
                '#F5333F',
                '#009D4F'
            ]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

// Growth Chart
const growthCtx = document.getElementById('growthChart').getContext('2d');
new Chart(growthCtx, {
    type: 'line',
    data: {
        labels: ['2019', '2020', '2021', '2022', '2023'],
        datasets: [{
            label: 'Beneficiaries',
            data: [1000, 2000, 3000, 4000, 5000],
            borderColor: '#003B71',
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
}); 