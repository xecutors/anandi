(function() {
    'use strict';

    // Course schedule data with abbreviations
    const courseSchedule = {
        monday: [
            { time: '07:15-08:15', name: 'Morning Batch 1 60 Min.', type: 'morning', abbr: 'MB1' },
            { time: '09:00-10:15', name: 'Morning Batch 2 75 Min.', type: 'morning', abbr: 'MB2' },
            { time: '10:30-11:45', name: 'Private Lesson 1:1 75 Min.', type: 'private', abbr: 'PL' },
            { time: '12:00-12:50', name: 'Lunchtime 50 Min.', type: 'lunchtime', abbr: 'LT' },
            { time: '14:00-18:00', name: 'Private Lesson 1:1 60-90 Min.', type: 'private', abbr: 'PL' },
            { time: '18:15-19:15', name: 'Afterwork 60-90 Min.', type: 'afterwork', abbr: 'AFT' },
            { time: '19:30', name: 'Evening 60-90 Min.', type: 'evening', abbr: 'EVE' }
        ],
        tuesday: [
            { time: '07:15-08:15', name: 'Morning Batch 1 60 Min.', type: 'morning', abbr: 'MB1' },
            { time: '09:00-10:15', name: 'Morning Batch 2 75 Min.', type: 'morning', abbr: 'MB2' },
            { time: '10:30-11:45', name: 'Private Lesson 1:1 75 Min.', type: 'private', abbr: 'PL' },
            { time: '12:00-12:50', name: 'Lunchtime 50 Min.', type: 'lunchtime', abbr: 'LT' },
            { time: '14:00-18:00', name: 'Private Lesson 1:1 60-90 Min.', type: 'private', abbr: 'PL' },
            { time: '18:15-19:15', name: 'Afterwork 60-90 Min.', type: 'afterwork', abbr: 'AFT' },
            { time: '19:30', name: 'Evening 60-90 Min.', type: 'evening', abbr: 'EVE' }
        ],
        wednesday: [
            { time: '07:15-08:15', name: 'Morning Batch 1 60 Min.', type: 'morning', abbr: 'MB1' },
            { time: '09:00-10:15', name: 'Morning Batch 2 75 Min.', type: 'morning', abbr: 'MB2' },
            { time: '10:30-11:45', name: 'Private Lesson 1:1 75 Min.', type: 'private', abbr: 'PL' },
            { time: '12:00-12:50', name: 'Lunchtime 50 Min.', type: 'lunchtime', abbr: 'LT' },
            { time: '14:00-18:00', name: 'Private Lesson 1:1 60-90 Min.', type: 'private', abbr: 'PL' },
            { time: '18:15-19:15', name: 'Afterwork 60-90 Min.', type: 'afterwork', abbr: 'AFT' },
            { time: '19:30', name: 'Evening 60-90 Min.', type: 'evening', abbr: 'EVE' }
        ],
        thursday: [
            { time: '07:15-08:15', name: 'Morning Batch 1 60 Min.', type: 'morning', abbr: 'MB1' },
            { time: '09:00-10:15', name: 'Morning Batch 2 75 Min.', type: 'morning', abbr: 'MB2' },
            { time: '10:30-11:45', name: 'Private Lesson 1:1 75 Min.', type: 'private', abbr: 'PL' },
            { time: '12:00-12:50', name: 'Lunchtime 50 Min.', type: 'lunchtime', abbr: 'LT' },
            { time: '14:00-18:00', name: 'Private Lesson 1:1 60-90 Min.', type: 'private', abbr: 'PL' },
            { time: '18:15-19:15', name: 'Afterwork 60-90 Min.', type: 'afterwork', abbr: 'AFT' },
            { time: '19:30', name: 'Evening 60-90 Min.', type: 'evening', abbr: 'EVE' }
        ],
        friday: [
            { time: '07:15-08:15', name: 'Morning Batch 1 60 Min.', type: 'morning', abbr: 'MB1' },
            { time: '09:00-10:15', name: 'Morning Batch 2 75 Min.', type: 'morning', abbr: 'MB2' },
            { time: '10:30-11:45', name: 'Private Lesson 1:1 75 Min.', type: 'private', abbr: 'PL' },
            { time: '12:00-12:50', name: 'Lunchtime 50 Min.', type: 'lunchtime', abbr: 'LT' },
            { time: '14:00-18:00', name: 'Private Lesson 1:1 60-90 Min.', type: 'private', abbr: 'PL' },
            { time: '18:15-19:15', name: 'Afterwork 60-90 Min.', type: 'afterwork', abbr: 'AFT' },
            { time: '19:30', name: 'Evening 60-90 Min.', type: 'evening', abbr: 'EVE' }
        ],
        saturday: [
            { time: '09:00-10:15', name: 'Morning Batch 2 75 Min.', type: 'morning', abbr: 'MB2' },
            { time: '10:30-12:00', name: 'Weekend 90 Min.', type: 'weekend', abbr: 'WKD' },
            { time: '12:00-13:30', name: 'Private Lesson 1:1 60-90 Min.', type: 'lunchtime', abbr: 'LT' },
            { time: '14:00-18:00', name: 'Private Lesson 1:1 60-90 Min.', type: 'private', abbr: 'PL' }
        ],
        sunday: [
            { time: '12:00', name: 'Sunday Bliss 90-120 Min.', type: 'sunday', abbr: 'SUN' }
        ]
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

    function addCourseToCell(cell, course) {
        const courseDiv = document.createElement('div');
        courseDiv.className = `course-cell ${course.type}`;
        
        // Split course name and duration more flexibly
        const nameMatch = course.name.match(/^(.+?)\s+(\d+(?:-\d+)?\s+Min\.)$/);
        
        if (nameMatch) {
            const nameSpan = document.createElement('div');
            nameSpan.className = 'course-name';
            nameSpan.textContent = nameMatch[1];
            
            const durationSpan = document.createElement('div');
            durationSpan.className = 'course-duration';
            durationSpan.textContent = nameMatch[2];
            
            courseDiv.appendChild(nameSpan);
            courseDiv.appendChild(durationSpan);
        } else {
            const nameSpan = document.createElement('div');
            nameSpan.className = 'course-name';
            nameSpan.textContent = course.name;
            courseDiv.appendChild(nameSpan);
        }
        
        const timeSpan = document.createElement('div');
        timeSpan.className = 'course-time';
        timeSpan.textContent = course.time;
        
        courseDiv.appendChild(timeSpan);
        cell.appendChild(courseDiv);
    }

    function renderWeeklySchedule() {
        // Clear schedules
        weeklyScheduleBody.innerHTML = '';
        fixedColumnBody.innerHTML = '';
        const daysHeader = document.getElementById('daysHeader');
        daysHeader.innerHTML = '';
        
        // Define weekdays
        const weekdays = [
            { key: 'monday', name: 'Mo' },
            { key: 'tuesday', name: 'Di' },
            { key: 'wednesday', name: 'Mi' },
            { key: 'thursday', name: 'Do' },
            { key: 'friday', name: 'Fr' },
            { key: 'saturday', name: 'Sa' },
            { key: 'sunday', name: 'So' }
        ];
        
        // Define time slots
        const timeSlots = ['07:15', '09:00', '10:30', '12:00', '14:00', '18:15', '19:30'];
        
        // Create header row with day names
        weekdays.forEach(weekday => {
            const th = document.createElement('th');
            th.textContent = weekday.name;
            daysHeader.appendChild(th);
        });
        
        // Create rows for each time slot
        timeSlots.forEach(timeSlot => {
            // Fixed column with time
            const fixedRow = document.createElement('tr');
            const timeCell = document.createElement('td');
            timeCell.textContent = timeSlot;
            timeCell.className = 'time-cell';
            fixedRow.appendChild(timeCell);
            fixedColumnBody.appendChild(fixedRow);
            
            // Scrollable content row with courses
            const row = document.createElement('tr');
            row.className = 'schedule-row';
            
            // Create cells for each day
            weekdays.forEach(weekday => {
                const cell = document.createElement('td');
                
                // Find course for this time and day
                const courses = courseSchedule[weekday.key] || [];
                const course = courses.find(c => c.time.startsWith(timeSlot));
                
                if (course) {
                    addCourseToCell(cell, course);
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