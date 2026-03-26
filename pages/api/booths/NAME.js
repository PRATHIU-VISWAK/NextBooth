import dbConnect from '../../../lib/mongodb';
import VoterList from '../../../models/voterList';

const BOOTH_SETS = {
  "100":  [191, 192 , 195 , 198 , 199 , 200 , 201],
  "100A": [76 , 77 , 78 , 82 , 83 , 193 , 194 , 196 , 197],
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    const name = String(req.query.name);
    const booth = req.query.booth;

    // Create query to search in both NameENG and Name (Tamil) fields
    let query = {
      $or: [
        { NameENG: name },
        { Name: name }
      ]
    };

    // Add booth filter if specified
    if (booth && booth !== 'all') {
      let boothNumbers;

      if (BOOTH_SETS[booth]) {
        // Named set like "100" or "100A"
        boothNumbers = BOOTH_SETS[booth];
      } else if (booth.includes(',')) {
        // Comma-separated list
        boothNumbers = booth.split(',').map(Number);
      } else {
        // Single booth number
        boothNumbers = [parseInt(booth)];
      }

      query = {
        $and: [
          query,
          { Booth: { $in: boothNumbers } }
        ]
      };
    }

    const person = await VoterList.find(query);

    if (person && person.length > 0) {
      res.status(200).json(person);
    } else {
      res.status(404).json({ message: "Person not found." });
    }
  } catch (error) {
    console.error('Error retrieving person:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}