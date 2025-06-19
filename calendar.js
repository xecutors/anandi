(function() {
    'use strict';

    // Course schedule data with abbreviations
    const courseSchedule = {
        monday: [
            { time: '07:15-08:30', name: 'Fundamental Yoga für Einsteiger', type: 'fundamental', abbr: 'FW' },
            { time: '11:50-12:40', name: 'Lunchtime Yoga 50 Min.', type: 'lunchtime', abbr: 'LT' },
            { time: '14:30-15:45', name: 'Fundamental Yoga für Einsteiger', type: 'fundamental', abbr: 'FW' }
        ],
        tuesday: [
            { time: '05:45-07:00', name: 'Regular Morning Class', type: 'earlybird', abbr: 'MO' },
            { time: '12:50-13:40', name: 'Lunchtime Yoga 50 Min.', type: 'lunchtime', abbr: 'LL' },
            { time: '16:15-17:30', name: 'Fundamental Yoga für Einsteiger', type: 'fundamental', abbr: 'FW' }
        ],
        wednesday: [
            { time: '07:15-08:30', name: 'Fundamental Yoga für Einsteiger', type: 'fundamental', abbr: 'FW' },
            { time: '11:50-12:40', name: 'Lunchtime Yoga 50 Min.', type: 'lunchtime', abbr: 'LT' },
            { time: '14:30-15:45', name: 'Fundamental Yoga für Einsteiger', type: 'fundamental', abbr: 'FW' }
        ],
        thursday: [
            { time: '05:45-07:00', name: 'Regular Morning Class', type: 'earlybird', abbr: 'MO' },
            { time: '12:50-13:40', name: 'Lunchtime Yoga 50 Min.', type: 'lunchtime', abbr: 'LL' },
            { time: '16:15-17:30', name: 'Fundamental Yoga für Einsteiger', type: 'fundamental', abbr: 'FW' }
        ],
        friday: [
            { time: '07:15-08:30', name: 'Fundamental Yoga für Einsteiger', type: 'fundamental', abbr: 'FW' },
            { time: '11:50-12:40', name: 'Lunchtime Yoga 50 Min.', type: 'lunchtime', abbr: 'LT' },
            { time: '14:30-15:45', name: 'Fundamental Yoga für Einsteiger', type: 'fundamental', abbr: 'FW' }
        ],
        saturday: [
            { time: '09:00-10:15', name: 'Regular Morning Class', type: 'morning', abbr: 'MO' },
            { time: '10:30-11:45', name: 'Fundamental Yoga für Einsteiger', type: 'fundamental', abbr: 'FW' },
        ],
        sunday: []
    };


    // Calendar state - force to actual current date
    const now = new Date();
    let currentMonth = now.getMonth();
    let currentYear = now.getFullYear();
    
    // Debug current date
    console.log('Calendar initialized with current date:', {
        actualDate: now.toISOString(),
        currentMonth: currentMonth,
        currentYear: currentYear,
        monthName: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'][currentMonth]
    });

    // DOM elements
    const weeklyScheduleBody = document.getElementById('weeklySchedule');
    const fixedColumnBody = document.getElementById('fixedColumnBody');

    // German month names
    const monthNames = [
        'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
        'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ];

    // German day names (without Sunday)
    const dayNames = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

    // Initialize weekly schedule
    function init() {
        if (!weeklyScheduleBody || !fixedColumnBody) {
            return; // Schedule element not found on this page
        }

        renderWeeklySchedule();
    }

    function renderWeeklySchedule() {
        // Clear schedules
        weeklyScheduleBody.innerHTML = '';
        fixedColumnBody.innerHTML = '';
        
        // Define weekdays
        const weekdays = [
            { key: 'monday', name: 'Mo' },
            { key: 'tuesday', name: 'Di' },
            { key: 'wednesday', name: 'Mi' },
            { key: 'thursday', name: 'Do' },
            { key: 'friday', name: 'Fr' },
            { key: 'saturday', name: 'Sa' }
        ];
        
        // Define time slots
        const timeSlots = ['05:45', '07:15', '09:00', '10:30', '11:50', '12:50', '14:30', '16:15'];
        
        // Create rows for each weekday
        weekdays.forEach(weekday => {
            // Fixed column row (day names)
            const fixedRow = document.createElement('tr');
            const dayCell = document.createElement('td');
            dayCell.textContent = weekday.name;
            fixedRow.appendChild(dayCell);
            fixedColumnBody.appendChild(fixedRow);
            
            // Scrollable content row
            const row = document.createElement('tr');
            row.className = 'schedule-row';
            
            // Time slot cells
            timeSlots.forEach(timeSlot => {
                const cell = document.createElement('td');
                
                // Find course for this day and time slot
                const courses = courseSchedule[weekday.key] || [];
                const course = courses.find(c => c.time.startsWith(timeSlot));
                
                if (course) {
                    const courseDiv = document.createElement('div');
                    courseDiv.className = `course-cell ${course.type}`;
                    
                    const nameSpan = document.createElement('div');
                    nameSpan.className = 'course-name';
                    nameSpan.textContent = course.name;
                    
                    const timeSpan = document.createElement('div');
                    timeSpan.className = 'course-time';
                    timeSpan.textContent = course.time;
                    
                    courseDiv.appendChild(nameSpan);
                    courseDiv.appendChild(timeSpan);
                    
                    cell.appendChild(courseDiv);
                }
                
                row.appendChild(cell);
            });
            
            weeklyScheduleBody.appendChild(row);
        });
        
        // Sync row heights between fixed and scrollable tables
        syncRowHeights();
    }
    
    function syncRowHeights() {
        // Get header heights from both tables
        const fixedHeader = document.querySelector('.schedule-table-fixed thead tr');
        const scrollableHeader = document.querySelector('.schedule-table thead tr');
        
        // Sync header heights first
        if (fixedHeader && scrollableHeader) {
            const fixedHeaderHeight = fixedHeader.offsetHeight;
            const scrollableHeaderHeight = scrollableHeader.offsetHeight;
            const maxHeaderHeight = Math.max(fixedHeaderHeight, scrollableHeaderHeight);
            
            fixedHeader.style.height = maxHeaderHeight + 'px';
            scrollableHeader.style.height = maxHeaderHeight + 'px';
        }
        
        // Then sync body row heights
        const fixedRows = fixedColumnBody.querySelectorAll('tr');
        const scrollableRows = weeklyScheduleBody.querySelectorAll('tr');
        
        // Reset heights first
        fixedRows.forEach(row => row.style.height = 'auto');
        scrollableRows.forEach(row => row.style.height = 'auto');
        
        // Sync heights
        for (let i = 0; i < Math.min(fixedRows.length, scrollableRows.length); i++) {
            const fixedHeight = fixedRows[i].offsetHeight;
            const scrollableHeight = scrollableRows[i].offsetHeight;
            const maxHeight = Math.max(fixedHeight, scrollableHeight);
            
            fixedRows[i].style.height = maxHeight + 'px';
            scrollableRows[i].style.height = maxHeight + 'px';
        }
    }
    
    // Remove old calendar functions - now using weekly schedule
    
    

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();