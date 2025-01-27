const isQuestLive = (startDate, endDate) => {
  const now = new Date();
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  if (start && end) {
    return now >= start && now <= end;
  } else if (start) {
    return now >= start;
  } else if (end) {
    return now <= end;
  } else {
    return true;
  }
};

const getTimeLeft = (endDate) => {
  if (!endDate) {
    return '';
  }

  const now = new Date();
  const end = new Date(endDate);
  const diff = end - now;

  if (diff <= 0) {
    return 'Ended';
  }

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const timeComponents = [];
  if (days > 0) timeComponents.push(`${days} day${days !== 1 ? 's' : ''}`);
  if (hours > 0) timeComponents.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
  if (minutes > 0) timeComponents.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
  // if (seconds > 0) timeComponents.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);
  return `${timeComponents.join(' ')}`;
};

export { isQuestLive, getTimeLeft };