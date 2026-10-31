'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';

const CurrentDate = () => {
    const [currentDate, setCurrentDate] = useState(null);

    useEffect(() => {
        setCurrentDate(new Date());
    }, []);

    return (
        <p aria-live="polite" className="min-h-6">
            {currentDate ? format(currentDate, 'EEEE, MMMM do, yyyy') : '\u00a0'}
        </p>
    );
};

export default CurrentDate;
