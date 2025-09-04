// Compenets/Calendar123.jsx
import { Calendar } from 'antd';

export default function Calendar123() {
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return (
    <div style={{ width: '300px', border: '1px solid #f0f0f0', borderRadius: '2px' }}>
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </div>
  );
}