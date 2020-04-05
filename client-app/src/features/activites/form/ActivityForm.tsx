import React, { useState, FormEvent } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import {v4 as uuid} from 'uuid';

interface IProps {
  activity: IActivity | null;
  setEditMode:(editMode:Boolean)=>void;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}


const ActivityForm: React.FC<IProps> = ({activity:initialFormState,setEditMode,editActivity,createActivity}) =>{

  const initialActivity = {
    id:uuid(),
    title:'',
    category:'',
    description:'',
    date:'',
    city:'',
    venue:''
  }

  const initializeForm = initialFormState || initialActivity;

  const [activity,setActivity] = useState<IActivity>(initializeForm)

  const handleInputChange = (event:FormEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    setActivity({...activity,[event.currentTarget.name]:event.currentTarget.value})
  }

  const handleSubmit = (event:FormEvent)=>{
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          name='title'
          placeholder='Title'
          value={activity.title}
          onChange={handleInputChange}
        />
        <Form.TextArea
          name='description'
          rows={2}
          placeholder='Description'
          value={activity.description}
          onChange={handleInputChange}
        />
        <Form.Input
          name='category'
          placeholder='Category'
          value={activity.category}
          onChange={handleInputChange}
        />
        <Form.Input
          name='date'
          type='datetime-local'
          placeholder='Date'
          value={activity.date}
          onChange={handleInputChange}
        />
        <Form.Input
          name='city'
          placeholder='City'
          value={activity.city}
          onChange={handleInputChange}
        />
        <Form.Input
          name='venue'
          placeholder='Venue'
          value={activity.venue}
          onChange={handleInputChange}
        />
        <Button floated='right' positive type='submit' content='Submit' />
        <Button
          onClick={()=>setEditMode(false)}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
