"use client";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetRubrosQuery } from "@/redux/services/rubrosApi";
import Spinner from "../../../components/spinner";
import { useEffect } from "react";

export default function Rubros() {
  const { data: rubros, error, isLoading, refetch } = useGetRubrosQuery(1);

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <Spinner />	;
  if (error) return <div>Error</div>;
  
  return (
    <section className="gap-0">
      <div className="flex justify-end mr-4">
        <Link href="/dashboard/rubros/create">
          <span className="w-[185px] flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Crear Rubro
          </span>
        </Link>
      </div>
      <Table>
        <TableCaption className="caption-top">Listado de Rubros</TableCaption>
        <TableHeader>
          <TableRow className="w-4/4">
            <TableHead className="w-2/4">Rubro</TableHead>
            <TableHead className="w-1/4 text-right">Acciones</TableHead>
            <TableHead className="w-1/4"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rubros?.map((rubro: any) => (
            <TableRow key={rubro.id}>
              <TableCell className="font-medium">{rubro.nombre}</TableCell>
              <TableCell>
                <Link
                  href={`/dashboard/rubros/update/${rubro.id}`}
                  className="mx-1"
                >
                  <button className="bg-green-700 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 w-[110px] justify-center rounded inline-flex items-center">
                    <svg
                      className="h-4 w-4 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <polyline points="1 4 1 10 7 10" />{" "}
                      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                    </svg>
                    <span className="text-white ml-1">Actualizar</span>
                  </button>
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/dashboard/rubros/delete/${rubro.id}`}
                  className="mx-1"
                >
                  <button className="bg-red-700 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 w-[110px] justify-center rounded inline-flex items-center">
                    <svg
                      className="h-4 w-4 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <polyline points="3 6 5 6 21 6" />{" "}
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />{" "}
                      <line x1="10" y1="11" x2="10" y2="17" />{" "}
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                    <span className="text-white ml-1">Eliminar</span>
                  </button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
