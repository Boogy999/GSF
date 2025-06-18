// Initialize Calendar
document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            {
                title: 'Tech for Good Hackathon',
                start: '2024-06-15',
                end: '2024-06-17',
                color: '#003B71'
            },
            {
                title: 'Women in Tech Workshop',
                start: '2024-06-20',
                color: '#00A7E1'
            },
            {
                title: 'Startup Pitch Day',
                start: '2024-07-01',
                color: '#F5333F'
            }
        ]
    });
    calendar.render();
}); 