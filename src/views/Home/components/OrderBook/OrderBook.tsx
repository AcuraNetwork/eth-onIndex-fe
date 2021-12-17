/* eslint-disable react/react-in-jsx-scope */
import styled from 'styled-components';
import { Text } from '@evercreative/onidex-uikit';

import { usePriceCakeBusd, usePriceBnbBusd } from 'state/hooks';
import AutoHistory from './AutoHistory';

const OrderBookCard = styled.div`
  background: ${({ theme }) => theme.isDark ? '#070707' : '#fff'};
  color: ${({ theme }) => theme.isDark ? '#fff' : '#000'};
  padding: 16px;
  min-width: 240px;
  width: 25%;
  margin-left: 8px;

  // height: 953px;
  border-radius: 15px;
  // padding: 10px 20px;
  text-align: center;

  table {
    width: 100%;
    margin-bottom: 16px;
  }

  p {
    font-weight: normal;
    font-size: 14px;
    letter-spacing: 0.1em;
    text-align: center;
  }

  .order_book_table_heading {
    font-size: 14px;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.isDark ? '#d3d3d5' : '#000'};
    opacity: 0.79;
    line-height: 2;
  }

  .order_book_table_body {
    font-weight: 300;
    font-size: 14px;
    color: ${({ theme }) => theme.isDark ? '#d3d3d5' : '#000'};
    td {
      padding: 6px 0px;
    }
  }
	@media screen and (max-width: 1144px) {
		width: calc(100% - 16px);
		margin-top: 30px;
	}
`;

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;

	@media screen and (max-width: 1144px) {
		flex-direction: row;
	}
	@media screen and (max-width: 490px) {
		flex-direction: column;
	}
`
const OrderBook = ({ selectedTokenInfo }) => {
  const cakePriceUsd = usePriceCakeBusd();
  const bnbPriceUsd = usePriceBnbBusd();
  
  const quoteTokenPrice = selectedTokenInfo ? selectedTokenInfo.quotePrice * bnbPriceUsd.toNumber() : cakePriceUsd.toNumber();
  
	return (
		<OrderBookCard>
			<Text fontSize='20px' color='primary'>Order Book</Text>
			<ContentContainer>
				<AutoHistory type='Limit' />
			{/* <table className="table mt-3 table-borderless">
				<thead>
					<tr className="order_book_table_heading">
						<td>Price</td>
						<td>Amount</td>
						<td>Total</td>
					</tr>
				</thead>
				<tbody>
					<tr className="order_book_table_body">
						<td style={{ color: '#ef5350' }}>{quoteTokenPrice.toFixed(2)}</td>
						<td>0.07</td>
						<td>{(0.07 * quoteTokenPrice).toFixed(2)}</td>
					</tr>
					<tr className="order_book_table_body">
						<td style={{ color: '#ef5350' }}>{quoteTokenPrice.toFixed(2)}</td>
						<td>1.07</td>
						<td>{(1.07 * quoteTokenPrice).toFixed(2)}</td>
					</tr>
					<tr className="order_book_table_body">
						<td style={{ color: '#ef5350' }}>{quoteTokenPrice.toFixed(2)}</td>
						<td>0.98</td>
						<td>{(0.98 * quoteTokenPrice).toFixed(2)}</td>
					</tr>
					<tr className="order_book_table_body">
						<td style={{ color: '#ef5350' }}>{quoteTokenPrice.toFixed(2)}</td>
						<td>2.07</td>
						<td>{(2.07 * quoteTokenPrice).toFixed(2)}</td>
					</tr>
					<tr className="order_book_table_body">
						<td style={{ color: '#ef5350' }}>{quoteTokenPrice.toFixed(2)}</td>
						<td>4.17</td>
						<td>{(4.17 * quoteTokenPrice).toFixed(2)}</td>
					</tr>
					<tr className="order_book_table_body">
						<td style={{ color: '#ef5350' }}>{quoteTokenPrice.toFixed(2)}</td>
						<td>56.24</td>
						<td>{(56.24 * quoteTokenPrice).toFixed(2)}</td>
					</tr>
					<tr className="order_book_table_body">
						<td style={{ color: '#ef5350' }}>{quoteTokenPrice.toFixed(2)}</td>
						<td>2</td>
						<td>{(2 * quoteTokenPrice).toFixed(2)}</td>
					</tr>
					<tr className="order_book_table_body">
						<td style={{ color: '#ef5350' }}>{quoteTokenPrice.toFixed(2)}</td>
						<td>0.07</td>
						<td>{(0.07 * quoteTokenPrice).toFixed(2)}</td>
					</tr>
					<tr className="order_book_table_body">
						<td style={{ color: '#ef5350' }}>{quoteTokenPrice.toFixed(2)}</td>
						<td>2.07</td>
						<td>{(2.07 * quoteTokenPrice).toFixed(2)}</td>
					</tr>
					<tr className="order_book_table_body">
						<td style={{ color: '#ef5350' }}>{quoteTokenPrice.toFixed(2)}</td>
						<td>3.897</td>
						<td>{(3.897 * quoteTokenPrice).toFixed(2)}</td>
					</tr>
					<tr className="order_book_table_body">
						<td style={{ color: '#ef5350' }}>{quoteTokenPrice.toFixed(2)}</td>
						<td>3.07</td>
						<td>{(3.07 * quoteTokenPrice).toFixed(2)}</td>
					</tr>
					<tr className="order_book_table_body">
						<td style={{ color: '#ef5350' }}>{quoteTokenPrice.toFixed(2)}</td>
						<td>2.65</td>
						<td>{(2.65 * quoteTokenPrice).toFixed(2)}</td>
					</tr>
				</tbody>
			</table>

			<table className="table mt-5 table-borderless">
				<thead>
					<tr className="order_book_table_heading">
						<td>Price</td>
						<td>Amount</td>
						<td>Total</td>
					</tr>
				</thead>
				<tbody>
					<tr className="order_book_table_body">
						<td style={{ color: '#1bc870' }}>{quoteTokenPrice.toFixed(2)}</td>
						<td>2.07</td>
						<td>{(2.07 * quoteTokenPrice).toFixed(2)}</td>
					</tr>
					<tr className="order_book_table_body">
						<td style={{ color: '#1bc870' }}>{quoteTokenPrice.toFixed(2)}</td>
						<td>3.897</td>
						<td>{(3.897 * quoteTokenPrice).toFixed(2)}</td>
					</tr>
					<tr className="order_book_table_body">
						<td style={{ color: '#1bc870' }}>{quoteTokenPrice.toFixed(2)}</td>
						<td>3.07</td>
						<td>{(3.07 * quoteTokenPrice).toFixed(2)}</td>
					</tr>
					<tr className="order_book_table_body">
						<td style={{ color: '#1bc870' }}>{quoteTokenPrice.toFixed(2)}</td>
						<td>2.65</td>
						<td>{(2.65 * quoteTokenPrice).toFixed(2)}</td>
					</tr>
					<tr className="order_book_table_body">
						<td style={{ color: '#1bc870' }}>{quoteTokenPrice.toFixed(2)}</td>
						<td>0.07</td>
						<td>{(0.07 * quoteTokenPrice).toFixed(2)}</td>
					</tr>
					<tr className="order_book_table_body">
						<td style={{ color: '#1bc870' }}>{quoteTokenPrice.toFixed(2)}</td>
						<td>2.07</td>
						<td>{(2.07 * quoteTokenPrice).toFixed(2)}</td>
					</tr>
					<tr className="order_book_table_body">
						<td style={{ color: '#1bc870' }}>{quoteTokenPrice.toFixed(2)}</td>
						<td>4.17</td>
						<td>{(4.17 * quoteTokenPrice).toFixed(2)}</td>
					</tr>
					<tr className="order_book_table_body">
						<td style={{ color: '#1bc870' }}>{quoteTokenPrice.toFixed(2)}</td>
						<td>56.24</td>
						<td>{(56.24 * quoteTokenPrice).toFixed(2)}</td>
					</tr>
					<tr className="order_book_table_body">
						<td style={{ color: '#1bc870' }}>{quoteTokenPrice.toFixed(2)}</td>
						<td>2</td>
						<td>{(2 * quoteTokenPrice).toFixed(2)}</td>
					</tr>
					<tr className="order_book_table_body">
						<td style={{ color: '#1bc870' }}>{quoteTokenPrice.toFixed(2)}</td>
						<td>0.07</td>
						<td>{(0.07 * quoteTokenPrice).toFixed(2)}</td>
					</tr>
					<tr className="order_book_table_body">
						<td style={{ color: '#1bc870' }}>{quoteTokenPrice.toFixed(2)}</td>
						<td>2.07</td>
						<td>{(2.07 * quoteTokenPrice).toFixed(2)}</td>
					</tr>
				</tbody>
			</table> */}
			</ContentContainer>
		</OrderBookCard>
	)
}

export default OrderBook
