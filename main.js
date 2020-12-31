const minToString = v => 60 * v;

const minToNumber = v => v / 60;

function roundMinutes(t, rounder) {
    if (rounder === 0) {
        const hour = t.split(':')[0];
        return `${hour}:00`
    }
    function format(v) { return v < 10 ? '0' + v: v; }

    var m = t.split(':').reduce(function (h, m) { return h * 60 + +m; });

    m = Math.ceil(m / rounder) * rounder;

    return [Math.floor(m / 60), m % 60].map(format).join(':');
    
}

// var dataEx = ['10:00', '15:01', '10:13', '10:15', '10:16', '16:00', '16:12', '16:55'];
// console.log(dataEx.map(roundMinutes));
// console.log( roundMinutes('12:31', 30));

function stringToNumber (time) {
    const [hours, minutes] = time.split(":");
    return {
        hour: Number(hours),
        minutes: minutes.includes('00') ? 0 : minToNumber(Number(minutes))
    }
}

function mapIntervalNumberTotring (rangeList) {

    return rangeList.map(function callback (currentValue) {

        let hours = Math.trunc(currentValue); 

        if (hours < 10) {
            hours = '0' + hours;
        }

        let nMinutes = currentValue % 1;

        let minutes = minToString(nMinutes);

        if (minutes < 10) {
            minutes = minutes + '0'
        }
    
        let result =   `${hours}:${minutes}`

        return result;
    })
}

function timeToNumber (time) {
    const [hours, minutes] = time.split(":");
    return {
        hour: Number(hours),
        minutes: Number(minutes)
    }
}


function getTimeRanges(from = '00:00', to = '23:30', interval = 30) {

    function min30int (nFrom, nTo) { 
        const ranges = []; 
        // console.log(nFrom, nTo)
            for (let i = nFrom.hour; i <= nTo.hour + nTo.minutes; i+= 0.5 ) {
                
               ranges.push(i); 
            }
            // console.log(ranges)
            return ranges;
    }

    function min15int (nFrom, nTo) {
        const ranges = []; 
        // console.log(nFrom, nTo)
            for (let i = nFrom.hour; i <= nTo.hour + nTo.minutes; i+= 0.25 ) {
                
               ranges.push(i); 
            }
            // console.log(ranges)
            return ranges;
    }

    function oneMin (nFrom, nTo) {
        nFrom = timeToNumber(from);
        nTo = timeToNumber(to);
        let ranges = [];
        
        while (nFrom.hour <= nTo.hour) {
    
            if (nFrom.hour === nTo.hour) {
               
                for (let j = nFrom.minutes; j <= nTo.minutes; j++) {
                    if (j < 10) {
                        j = '0' + j;
                    }
                    let newTime = `${nFrom.hour}:${j}`
                    ranges.push(newTime);
    
                }
                break;
            }

            if (nFrom.hour < 10) {
                nFrom.hour = '0' + nFrom.hour;
            }
            
            for (let i = nFrom.minutes; i < 60; i++) {
                if (i < 10) {
                    i = '0' + i;
                }
                let newTime = `${nFrom.hour}:${i}`
                ranges.push(newTime);
            }
            nFrom.hour++
            nFrom.minutes = 0;
                   
        }
    
        return ranges;
    
    }
     
    let intervalResult = [];

    switch(interval) {
        case 30 : {
            const nFrom = stringToNumber(roundMinutes(from, 30))
            const nTo = stringToNumber(roundMinutes(to, 30));
            intervalResult = min30int(nFrom, nTo)

            return mapIntervalNumberTotring(intervalResult);
            
        }
        case 15 : {
            const nFrom = stringToNumber(roundMinutes(from, 15))
            const nTo = stringToNumber(roundMinutes(to, 15));
            intervalResult = min15int(nFrom, nTo)

            return mapIntervalNumberTotring(intervalResult);

        }
        case 1 : {
            const nFrom = timeToNumber(roundMinutes(from, 1))
            const nTo = timeToNumber(roundMinutes(to, 1));
            intervalResult = oneMin(nFrom, nTo)

            return intervalResult;

        }
    }        
}

console.log( getTimeRanges() );
console.log( getTimeRanges('13:00', '15:30', 15) );
console.log( getTimeRanges('20:00', '21:00', 1) );
console.log( getTimeRanges('01:00', '02:00', 1) );