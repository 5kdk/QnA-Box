import { atom } from 'jotai';

interface ReplyForProps {
  commentAuthorName: string;
  commentId: string;
}

const replyForState = atom<ReplyForProps | null>(null);

export default replyForState;
