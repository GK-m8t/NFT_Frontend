import {useRouter} from "next/router";

const Title = ({ title, buttonText, handleClick }) => {
  const router = useRouter()

  const handleBackToDashboard = () => {
    localStorage.removeItem('selectedTokenId')
    router.push('/dashboard')
  }

  return (
    <div className="flex items-center justify-between">
      <p className='page_title'>{title}</p>
      {buttonText &&
      <button
        className='back_to_dashboard'
        onClick={handleClick ? handleClick : handleBackToDashboard}
      >{buttonText}</button>
      }
    </div>
  );
};

export default Title;
