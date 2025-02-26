import dbConnect from '../../../lib/mongodb';
import VoterList from '../../../models/voterList';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    const name = String(req.query.name);
    const person = await VoterList.find({ Father_Husband: name });

    if (person) {
      res.status(200).json(person);
    } else {
      res.status(404).json({ message: "Person not found." });
    }
  } catch (error) {
    console.error('Error retrieving person:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
} 