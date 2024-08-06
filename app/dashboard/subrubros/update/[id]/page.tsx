"use client"
import React, { useState, useEffect } from 'react';
import { useGetSububrosByIdQuery } from '@/redux/services/subrubrosApi';

export default function UpdateSubrubroPage({params,}:{
  params: {id: number};
}) {
   
  const id = params.id;
  const {data: subrubro, isLoading, error} = useGetSububrosByIdQuery(id);

  return (
    <div className="flex justify-center">      
      {renderFormUpdateSubrubro()}
    </div>
  );
}