import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { fetchProductInfo } from '../../services/productService';

import KpiInfoList from '../kpiInfoList';

const ProductInfo = ({ productId }) => {
  const [info, setInfo] = useState([]);

  const fetchData = async () => {
    if (productId) {
      const response = await fetchProductInfo(productId);
      console.log(response);
      setInfo(
        Object.keys(response.data).map(item => ({
          label: item,
          description: response.data[item],
        })),
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [productId]);

  useEffect(() => {
    console.log(info);
  }, [info]);

  return (
    <KpiInfoList
      title="Product information"
      overlayInfo="ah finalmente estamos a fazer alguma coisa"
      data={info}
    />
  );
};

ProductInfo.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductInfo;

// TODO list kpi
