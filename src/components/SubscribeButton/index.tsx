import { useSession, signIn } from 'next-auth/react';
import styles from './styles.module.scss';

import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js';

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data } = useSession();

  async function handleSubscribe() {
    if (!data) {
      signIn();
      return;
    }

    // Criação da checkout session
    try {
      const response = await api.post('/subscribe')
      const { sessionId } = response.data;

      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({ sessionId: sessionId });
    } catch (error) {
      console.log(error)
      alert(error.message)
    }

  }
  return (
    <button
      type="button"
      onClick={handleSubscribe}
      className={styles.subscribeButton}>
      Subscribe now
    </button>
  )
}