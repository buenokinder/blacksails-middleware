using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NimbusServer.Domain.Entidades
{
    public class PaginadoGenerico
    {

        public List<Dictionary<string,object>> _Lista = new List<Dictionary<string, object>>();
        private int _PaginaAtual;
        private int _TamanhoPagina;
        private int _TotalRegistros;
        private int _TotalPaginas;
        private int _TotalDeRegistrosDaPagina;

        public int PaginaAtual
        {
            get
            {
                return _PaginaAtual;
            }
            set
            {
                _PaginaAtual = value;
            }
        }

        public int TamanhoDaPagina
        {
            get
            {
                return _TamanhoPagina;
            }
            set
            {
                _TamanhoPagina = value;
            }
        }

        public int TotalDeRegistros
        {
            get
            {
                return _TotalRegistros;
            }
            set
            {
                _TotalRegistros = value;
            }
        }

        public int TotalDeRegistrosDaPagina
        {
            get
            {
                return _TotalDeRegistrosDaPagina;
            }
            set
            {
                _TotalDeRegistrosDaPagina = value;
            }
        }
        public int TotalDePaginas
        {
            get
            {
                return _TotalPaginas;
            }
            set
            {
                _TotalPaginas = value;
            }

        }
    }
}
