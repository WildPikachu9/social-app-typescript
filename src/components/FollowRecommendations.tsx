import './_FollowRecommendations.scss';
import { FC, useEffect, useState } from 'react';
import { User } from '../types/User';
import { PostItem } from '../types/PostItem';
import { Recommendation } from '../types/Recommendation';
import axios from 'axios';

interface FollowRecProps {
    user: User | null;
    getLatestPosts: () => void;
    posts: PostItem[];
}

const FollowRecommendations: FC<FollowRecProps> = ({ user, getLatestPosts, posts }) => {

    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

    const getRecommendations = () => {
        axios
        .post('https://akademia108.pl/api/social-app/follows/recommendations')
        .then((res) => {
            setRecommendations(res.data);
        })
        .catch((error) => {
            console.error(error);
        });
    };

    useEffect(() => {
        getRecommendations()
    }, [posts]);

    const follow = (id: number): void => {
        axios.post('https://akademia108.pl/api/social-app/follows/follow', {
            leader_id: id
        })
        .then(() => {
            getLatestPosts();
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    return (
        <div className='FollowRecommendations'>
            {recommendations.map(recommendation => {
                return (
                    <div className='FollowRecommendation' key={recommendation.id}>
                        <img src={recommendation.avatar_url} alt={recommendation.username} />
                        <h3>{recommendation.username}</h3>
                        <button className='Btn' onClick={() => follow(recommendation.id)}>Follow</button>
                    </div>
                )
            })}
        </div>
    );
};

export default FollowRecommendations;