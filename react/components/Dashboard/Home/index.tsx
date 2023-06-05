import React from 'react'
import cn from 'classnames'
import styles from './home.css'
import { Link } from 'vtex.render-runtime'
import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

const data = [
  {
    month: 'jan',
    Vendas: 500,
    "Comissão acumulada no mês": 2400,
    amt: 2400,
  },
  {
    month: 'fev',
    Vendas: 200,
    "Comissão acumulada no mês": 1398,
    amt: 2210,
  },
  {
    month: 'mar',
    Vendas: 400,
    "Comissão acumulada no mês": 9800,
    amt: 2290,
  },
  {
    month: 'april',
    Vendas: 500,
    "Comissão acumulada no mês": 3908,
    amt: 2000,
  },
  {
    month: 'may',
    Vendas: 700,
    "Comissão acumulada no mês": 4800,
    amt: 2181,
  },
  {
    month: 'june',
    Vendas: 100,
    "Comissão acumulada no mês": 3800,
    amt: 2500,
  },
  {
    month: 'july',
    Vendas: 800,
    "Comissão acumulada no mês": 4300,
    amt: 2100,
  },
];

/*const getIntroOfPage = (label: string) => {
  if (label === 'Page A') {
    return "Page A is about men's clothing";
  }
  if (label === 'Page B') {
    return "Page B is about women's dress";
  }
  if (label === 'Page C') {
    return "Page C is about women's bag";
  }
  if (label === 'Page D') {
    return 'Page D is about household goods';
  }
  if (label === 'Page E') {
    return 'Page E is about food';
  }
  if (label === 'Page F') {
    return 'Page F is about baby food';
  }
  return '';
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <p className={styles.label}>{`${label} : ${payload[0].value}`}</p>
        <p className={styles.intro}>{getIntroOfPage(label)}</p>
        <p className={styles.desc}>Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
};*/

const parentWidth = () => {
  const chartContainer = window.document?.getElementById('chartContainer')
  return  chartContainer?.clientWidth
}

const Home: React.FC<React.DetailedHTMLProps<React.BaseHTMLAttributes<HTMLDivElement>, HTMLDivElement>> = () => {
  

  return (
    <section className={styles.content}>
      <div className={cn(styles.view1, styles.card)}>
        <p>Total a receber no mês</p>
        <p>R$XXXX,XX</p>
        <Link to='#'>Ver detalhes</Link>
      </div>
      <div className={cn(styles.view2, styles.card)}>
        <p>Número de vendas no mês</p>
        <p>R$XXXX,XX</p>
        <Link to='#'>Ver detalhes</Link>
      </div>

      <div className={styles.view3} id="chartContainer">
          <LineChart width={parentWidth()} margin={{ top: 30, right: 30, left: 15, bottom: 15 }} height={350} data={data} className={styles.chart}>
            <XAxis dataKey="month" strokeWidth={0} stroke="#FFFA" padding={{left: 8}}/>
            <YAxis yAxisId="right" strokeWidth={0} stroke="#FFFA" fontWeight={300}  padding={{bottom: 8}}/>
            <YAxis yAxisId="left" strokeWidth={0} orientation='right' stroke="#FFFA" fontWeight={300}  padding={{bottom: 8}}/>

            <Tooltip  itemStyle={{color: "#000"}}/>
            <Line yAxisId="left" type="monotone" dataKey="Vendas" stroke="#FFF" />
            <Line  yAxisId="right" type="monotone" dataKey="Comissão acumulada no mês" stroke="#FFF" />
          </LineChart>
      </div>
    </section>
  )
}

export default Home
