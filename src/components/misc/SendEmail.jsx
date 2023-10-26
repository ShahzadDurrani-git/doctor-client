import React, { useState } from 'react';
import EmailEditor from './EmailEditor';
import EmailSender from './EmailSender'
import EmailGroupSelector from './EmailGroupSelector'
import { sendEmailToGroup } from '../../api/api';
 

// Import the EmailGroupSelector, EmailEditor, and EmailSender components here.

function EmailComposePage() {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const sendEmail = async () => {
    try {
      if (!selectedGroup || !subject || !content) {
        return;
      }
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const extractedText = doc.body.textContent;
      const response = await sendEmailToGroup(selectedGroup, subject, extractedText);
      console.log(response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className="mainBg p-5 h-screen">
      <div className="bg-white shadow-md sm:rounded-lg flex p-8 flex-wrap gap-3">
    <div className='w-full'>
      <h1 className='text-black-800 text-lg font-semibold border-b border-solid border-black mb-10'>Compose Email</h1>
      <EmailGroupSelector selectedGroup={selectedGroup} onSelectGroup={setSelectedGroup} />
      <EmailEditor subject={subject} content={content} onSubjectChange={setSubject} onContentChange={setContent} />
      <EmailSender onSendEmail={sendEmail} />
    </div>
    </div>
    </div>
  );
}

export default EmailComposePage;
