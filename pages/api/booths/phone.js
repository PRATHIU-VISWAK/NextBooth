import dbConnect from '../../../lib/mongodb';
import VoterList from '../../../models/voterList';
import { Long } from 'mongodb';

const BOOTH_SETS = {
  "100":   [191, 192, 195, 198, 199, 200, 201],
  "100BC": [76, 77, 78, 193, 194, 196, 197],
  "100D":  [82, 83],
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const phoneStr = String(req.query.phone);
    const phoneLong = Long.fromString(phoneStr);
    const booth = req.query.booth;

    let query = {
      $or: [
        { Phone: phoneLong },
        { Govt_Phone: phoneLong }
      ]
    };

    if (booth && booth !== 'all') {
      let boothNumbers;

      if (BOOTH_SETS[booth]) {
        boothNumbers = BOOTH_SETS[booth];
      } else if (booth.includes(',')) {
        boothNumbers = booth.split(',').map(Number);
      } else {
        boothNumbers = [parseInt(booth)];
      }

      query = {
        $and: [
          query,
          { Booth: { $in: boothNumbers } }
        ]
      };
    }

    // ✅ Bypass Mongoose casting — use native MongoDB collection directly
    const nativeCollection = VoterList.collection;
    const results = await nativeCollection.find(query).toArray();

    console.log('Query result count:', results.length);

    res.status(200).json(results);

  } catch (error) {
    console.error('Error retrieving voters by phone:', error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}