import React from 'react';
import Button from './Button';

function EmailSender({ onSendEmail }) {
  return (
    <div className='w-1.8/12 float-right'>
      <Button text="Send Email" active onClick={onSendEmail}>Send Email</Button>
    </div>
  );
}

export default EmailSender;
