import React from 'react';
import { useSelector } from 'react-redux';
import { BusinessDetails } from '../../state/features/businesses/businessesTypes';
import { F7List } from 'framework7-react';
import { getBusinesses } from '../../state/features/businesses/businessesSelectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { NotAvailableMessage } from '../components/CommonStyledComponents';
import BusinessItem from '../components/business/BusinessItem';

const BusinessesPage: React.FC = () => {
  const businesses: BusinessDetails[] = useSelector(getBusinesses);

  return (
    <>
      {businesses.length === 0 ? (
        <NotAvailableMessage>
          Add a new business using the <FontAwesomeIcon icon={faPlusCircle} /> icon
        </NotAvailableMessage>
      ) : (
        <F7List themeDark mediaList style={{ margin: '0' }}>
          <ul>
            {businesses.map((business) => (
              <BusinessItem key={business.id} business={business} />
            ))}
          </ul>
        </F7List>
      )}
    </>
  );
};

export default BusinessesPage;
