"use client"

import Post from '@/components/Post/Post'
import styles from './manager.module.scss'
import {MdOutlineReportProblem } from "react-icons/md";
import {GoReport } from "react-icons/go";
GoReport
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import isAuthencation from '@/untils/auth';
import ReportComment from '@/components/ReportComment/ReportComment';
import ReportPost from '@/components/ReportPost/ReportPost';
import ManagerPost from '@/components/ManagerPost/ManagerPost';
import ManagerAccount from '@/components/ManagerAccount/ManagerAccount';


export default function Manager({params}) {
  const { data: session, status } = useSession();
  // isAuthencation(session);

  const [data, setData] = useState([]);
  const [sort, setSort] = useState("desc");
  const [state, setState] = useState('macc'); /* rpost, rcomment, mpost, mcomment */
  
  return (
    <main className={`${styles.container} mx-auto flex flex-row gap-4`}>
          <div className={`${styles.flexContainer} basis-1/6`}>
            <div className={`${styles.mamagerItem} ${state == 'macc' && styles.active} flex items-center`} onClick={() => setState('macc')}>
              <MdOutlineReportProblem className={styles.icons}></MdOutlineReportProblem>
                Quản lý tài khoản
            </div>
            {/* <div className={`${styles.mamagerItem} ${state == 'rpost' && styles.active} flex items-center`} onClick={() => setState('rpost')}>
              <MdOutlineReportProblem className={styles.icons}></MdOutlineReportProblem>
                Báo cáo bài viết
            </div>
            <div className={`${styles.mamagerItem} ${state == 'rcomment' && styles.active} flex items-center`} onClick={() => setState('rcomment')}>
              <GoReport className={styles.icons}></GoReport>
                Báo cáo bình luận
            </div> */}
            <div className={`${styles.mamagerItem} ${state == 'mpost' && styles.active} flex items-center`} onClick={() => setState('mpost')}>
              <MdOutlineReportProblem className={styles.icons}></MdOutlineReportProblem>
                Quản lý bài viết
            </div>
          </div>
          <div className={`basis-5/6 ${styles.flexContainer}`}>
            {
              // state == 'rpost' && <ReportPost></ReportPost>
            }
            {
              // state == 'rcomment' && <ReportComment></ReportComment>
            }
            {
              state == 'macc' && <ManagerAccount></ManagerAccount>
            }
            {
              state == 'mpost' && <ManagerPost></ManagerPost>
            }
          </div>
    </main>
  )
}
