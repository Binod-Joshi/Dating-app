"use client"
import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import './TinderCarousel.css';

interface Person {
  name: string;
  url: string;
}

const TinderCarousel: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([
    { name: 'galaxy', url: 'https://cdn.esawebb.org/archives/images/screen/weic2216b.jpg' },
    { name: 'Jeff Bezos', url: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' },
    { name: 'Mark Zuckerberg', url: 'https://images.ctfassets.net/hrltx12pl8hq/01rJn4TormMsGQs1ZRIpzX/16a1cae2440420d0fd0a7a9a006f2dcb/Artboard_Copy_231.jpg?fit=fill&w=600&h=600' },
    { name: 'shivani', url: 'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg' },
  ]);

  const [swipedDirection, setSwipedDirection] = useState<string | null>(null);
  const onSwipe = (direction: string, nameToDelete: string) => {
    console.log('Swiped: ' + nameToDelete);
    console.log('Direction: ' + direction);
    setSwipedDirection(null); // Reset direction after swiping is done
    setPeople((prevPeople) => prevPeople.filter((person) => person.name !== nameToDelete));
  };

  const onCardLeftScreen = (myIdentifier: string) => {
    console.log(myIdentifier + ' left the screen');
  };

  return (
    <div className="tinder-carousel">
      {people.length > 0 ? (
        people.map((person, index) => (
          <TinderCard
            className="swipe"
            key={index}
            onSwipe={(dir) => onSwipe(dir, person.name)}
            onCardLeftScreen={() => onCardLeftScreen(person.name)}
            preventSwipe={["up", "down"]} // Prevent unwanted swipe directions
          >
            <div
              style={{ backgroundImage: `url(${person.url})` }}
              className="card"
            >
              {/* Show like/dislike icon based on swiping direction */}
              {swipedDirection === 'right' && (
                <ThumbUpOffAltIcon className="swipe-icon like-icon" />
              )}
              {swipedDirection === 'left' && (
                <ThumbDownAltIcon className="swipe-icon dislike-icon" />
              )}
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))
      ) : (
        <div className="no-more-profiles">
          <h3>No more profiles for you.</h3>
        </div>
      )}
    </div>
  );
};

export default TinderCarousel;